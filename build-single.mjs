// One-shot build: combine the Next.js static export in website-static/
// into a single self-contained aurexa-website-single.html that preserves
// the exact rendered markup (3D flips, content, styling) and adds a
// tiny vanilla-JS layer for: hash routing between page-sections,
// mobile menu, accordion, hero slide pager, 3D-card flip on hover/click,
// and mailto:-based form submissions.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const SRC = path.join(ROOT, "website-static");
const OUT = path.join(ROOT, "aurexa-website-single.html");

const PAGES = [
  { id: "home", file: "index.html" },
  { id: "about", file: "about.html" },
  { id: "products", file: "products.html" },
  { id: "industries", file: "industries.html" },
  { id: "careers", file: "careers.html" },
  { id: "contact", file: "contact.html" },
  { id: "book-demo", file: "book-demo.html" },
  { id: "privacy", file: "legal/privacy.html" },
  { id: "terms", file: "legal/terms.html" },
];

// Map URL path -> page id
const PATH_TO_ID = {
  "/": "home",
  "/about": "about",
  "/products": "products",
  "/industries": "industries",
  "/careers": "careers",
  "/contact": "contact",
  "/book-demo": "book-demo",
  "/legal/privacy": "privacy",
  "/legal/terms": "terms",
};

function read(p) { return fs.readFileSync(p, "utf8"); }
function readBin(p) { return fs.readFileSync(p); }

// Pull out <main ...>...</main> from a rendered HTML page
function extractMain(html) {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) throw new Error("no <main> found");
  return m[1];
}

// Pull out the <header>...</header> + the announcement bar div right after it
function extractHeaderAndBanner(html) {
  const headerMatch = html.match(/<header\b[\s\S]*?<\/header>/i);
  if (!headerMatch) throw new Error("no <header>");
  // banner is the next <div ...class="...fixed top-16 ...">...</div>
  const after = html.slice(headerMatch.index + headerMatch[0].length);
  const banner = after.match(/^[\s]*<div\b[^>]*class="[^"]*\bfixed top-16\b[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  return headerMatch[0] + (banner ? banner[0] : "");
}

function extractFooter(html) {
  const m = html.match(/<footer\b[\s\S]*?<\/footer>/i);
  if (!m) throw new Error("no <footer>");
  return m[0];
}

function extractCss(html) {
  // Get the stylesheet link href value
  const m = html.match(/href="\/_next\/static\/css\/([^"]+)\.css"/);
  return m ? `_next/static/css/${m[1]}.css` : null;
}

function inlineLogos(html, dataUris) {
  // Replace src/href usages of /aurexa-logo.png and /qcmetric-logo-new.png
  return html
    .replace(/(?:["'(=])\/aurexa-logo\.png/g, (s) => s[0] + dataUris.aurexa)
    .replace(/(?:["'(=])\/qcmetric-logo-new\.png/g, (s) => s[0] + dataUris.qc);
}

// Strip Next.js runtime scripts/preloads (we replace with our own JS layer)
function stripNextRuntime(html) {
  return html
    .replace(/<script[^>]*src="\/_next\/[^"]*"[^>]*><\/script>/g, "")
    .replace(/<script[^>]*>\s*\(self\.__next_f[\s\S]*?<\/script>/g, "")
    .replace(/<script[^>]*>self\.__next_f[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]*rel="preload"[^>]*as="script"[^>]*>/g, "")
    .replace(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g, "")
    .replace(/<link[^>]*rel="stylesheet"[^>]*href="\/_next\/[^"]*"[^>]*>/g, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "");
}

// Rewrite internal hrefs to use hash-based routing so we can swap pages
// without a server. Anchors that begin with '/' map to '#/<id>'.
function rewriteInternalLinks(html) {
  return html.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (full, p, hash) => {
    if (p.startsWith("/_next/") || p.startsWith("//")) return full;
    if (!(p in PATH_TO_ID)) return full;
    const id = PATH_TO_ID[p];
    return `href="#/${id}${hash || ""}"`;
  });
}

// ---------- Build ----------
const indexHtml = read(path.join(SRC, "index.html"));
const cssPath = extractCss(indexHtml);
const css = cssPath ? read(path.join(SRC, cssPath)) : "";

const aurexaLogo =
  "data:image/png;base64," + readBin(path.join(SRC, "aurexa-logo.png")).toString("base64");
const qcLogo =
  "data:image/png;base64," + readBin(path.join(SRC, "qcmetric-logo-new.png")).toString("base64");
const dataUris = { aurexa: aurexaLogo, qc: qcLogo };

// Header + announcement banner (taken from index, identical on every page)
const headerBlock = extractHeaderAndBanner(indexHtml);
const footerBlock = extractFooter(indexHtml);

// Per-page <main> innerHTML
const pageBodies = PAGES.map((p) => {
  const html = read(path.join(SRC, p.file));
  const inner = extractMain(html);
  return { id: p.id, html: inner };
});

// Process all chunks through inline-logos + link rewrite
const procHeader = rewriteInternalLinks(inlineLogos(headerBlock, dataUris));
const procFooter = rewriteInternalLinks(inlineLogos(footerBlock, dataUris));
const procPages = pageBodies.map((p) => ({
  id: p.id,
  html: rewriteInternalLinks(inlineLogos(p.html, dataUris)),
}));

// ---------- Custom runtime JS ----------
const runtimeJs = `
(function(){
  "use strict";

  // ---------- Page routing ----------
  function showPage(id){
    if(!id) id = "home";
    var sections = document.querySelectorAll(".page-section");
    var found = false;
    sections.forEach(function(s){
      var match = s.getAttribute("data-page") === id;
      s.classList.toggle("is-active", match);
      if(match) found = true;
    });
    if(!found){
      // fallback
      var first = document.querySelector('.page-section[data-page="home"]');
      if(first) first.classList.add("is-active");
    }
    document.title = pageTitle(id);
    window.scrollTo(0,0);
    // close mobile menu on navigation
    closeMobileMenu();
  }
  function pageTitle(id){
    var titles = {
      "home": "Aurexa Technologies — Enterprise Digital Platforms for Regulated Industries",
      "about": "About — Aurexa Technologies",
      "products": "Products — Aurexa Technologies",
      "industries": "Industries — Aurexa Technologies",
      "careers": "Careers — Aurexa Technologies",
      "contact": "Contact — Aurexa Technologies",
      "book-demo": "Book a Demo — Aurexa Technologies",
      "privacy": "Privacy Policy — Aurexa Technologies",
      "terms": "Terms of Service — Aurexa Technologies"
    };
    return titles[id] || titles["home"];
  }
  function parseHash(){
    var h = (location.hash||"").replace(/^#\\/?/, "");
    if(!h) return "home";
    var slash = h.indexOf("/");
    return slash === -1 ? h.split("#")[0] : h.split("#")[0];
  }
  window.addEventListener("hashchange", function(){ showPage(parseHash()); });

  // ---------- Header: mobile menu ----------
  var mobileOpen = false;
  function ensureMobilePanel(){
    var panel = document.getElementById("mobile-menu-panel");
    if(panel) return panel;
    var header = document.querySelector("header");
    if(!header) return null;
    panel = document.createElement("div");
    panel.id = "mobile-menu-panel";
    panel.className = "md:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-md";
    panel.style.display = "none";
    panel.innerHTML = [
      '<nav class="flex flex-col p-4 gap-2 text-base font-medium text-black">',
      '  <a class="px-3 py-2 rounded hover:bg-slate-100" href="#/home">Home</a>',
      '  <a class="px-3 py-2 rounded hover:bg-slate-100" href="#/about">About</a>',
      '  <a class="px-3 py-2 rounded hover:bg-slate-100" href="#/industries">Industries</a>',
      '  <a class="px-3 py-2 rounded hover:bg-slate-100" href="#/careers">Careers</a>',
      '  <a class="px-3 py-2 rounded hover:bg-slate-100" href="#/contact">Contact</a>',
      '  <a class="mt-2 px-4 py-2 rounded-lg bg-brand-blue text-white font-semibold text-center" href="#/book-demo">Book a Demo</a>',
      '</nav>'
    ].join("");
    header.parentNode.insertBefore(panel, header.nextSibling);
    return panel;
  }
  function toggleMobileMenu(){
    var p = ensureMobilePanel(); if(!p) return;
    mobileOpen = !mobileOpen;
    p.style.display = mobileOpen ? "block" : "none";
  }
  function closeMobileMenu(){
    var p = document.getElementById("mobile-menu-panel");
    if(p){ p.style.display = "none"; mobileOpen = false; }
  }

  // ---------- 3D card flip ----------
  // Match any element whose inline style declares perspective. Its first
  // child is the rotatable inner wrapper.
  function initFlipCards(root){
    var cards = (root||document).querySelectorAll('[style*="perspective"]');
    cards.forEach(function(card){
      if(card.__flipBound) return; card.__flipBound = true;
      var inner = card.querySelector(":scope > div");
      if(!inner) return;
      inner.style.transition = "transform .7s";
      inner.style.transformStyle = "preserve-3d";
      function setFlipped(v){
        inner.style.transform = v ? "rotateY(180deg)" : "rotateY(0deg)";
      }
      card.addEventListener("mouseenter", function(){ setFlipped(true); });
      card.addEventListener("mouseleave", function(){ setFlipped(false); });
      // Click toggles for touch devices
      card.addEventListener("click", function(e){
        if(e.target.closest("a,button,input,textarea,select")) return;
        var cur = inner.style.transform.indexOf("180") !== -1;
        setFlipped(!cur);
      });
    });
  }

  // ---------- Accordions (About page bullet sections) ----------
  function initAccordions(root){
    var btns = (root||document).querySelectorAll('button:has(svg.lucide-chevron-down)');
    btns.forEach(function(btn){
      if(btn.__accBound) return; btn.__accBound = true;
      var panel = btn.nextElementSibling;
      var chev = btn.querySelector("svg");
      // Start collapsed unless original markup has chevron rotate-180
      var open = chev && chev.classList.contains("rotate-180");
      if(panel && panel.tagName === "DIV" && !panel.classList.contains("absolute")){
        panel.style.display = open ? "" : "none";
      }
      btn.addEventListener("click", function(){
        open = !open;
        if(chev){ chev.classList.toggle("rotate-180", open); }
        if(panel && panel.tagName === "DIV" && !panel.classList.contains("absolute")){
          panel.style.display = open ? "" : "none";
        }
      });
    });
  }

  // ---------- About tiles — inject bodies on demand ----------
  // The static export only renders the headers of the three About tiles
  // (Deep domain knowledge / Compliance-first engineering / Innovation at scale).
  // Inject the body content and wire the chevron toggle.
  var ABOUT_TILE_BODIES = {
    "Deep domain knowledge": "At Aurexa Technologies our team brings decades of hands-on expertise across life sciences, pharmaceuticals, medical devices, and other highly regulated industries. This deep domain knowledge enables us to design solutions grounded in real-world operational challenges, regulatory expectations, and industry best practices. By combining practical industry experience with technology-driven innovation, we help organizations streamline compliance, improve quality processes, and achieve operational excellence with confidence.",
    "Compliance-first engineering": "At Aurexa Technologies compliance-first engineering is embedded into the foundation of every platform we build. Our solutions are purpose-designed to align with GxP requirements, 21 CFR Part 11, ISO standards, and global data privacy regulations, ensuring regulatory readiness from day one. Rather than treating compliance as an afterthought, we engineer it directly into system architecture, workflows, security controls, audit trails, and validation frameworks to deliver reliable, inspection-ready digital solutions for highly regulated industries.",
    "Innovation at scale": "At Aurexa Technologies innovation at scale is driven through cloud-native technologies, advanced analytics, and AI-ready architectures that convert quality and operational data into actionable, decision-grade insights. We continuously analyze evolving industry challenges to develop innovative, scalable solutions tailored for regulated environments. By combining modern digital capabilities with deep regulatory understanding, we enable organizations to improve efficiency, accelerate decision-making, and deliver measurable business value across enterprise operations."
  };
  function initAboutTiles(root){
    var spans = (root||document).querySelectorAll('button > span.font-bold.text-lg');
    spans.forEach(function(span){
      var title = (span.textContent || "").trim();
      var body = ABOUT_TILE_BODIES[title];
      if(!body) return;
      var btn = span.closest('button');
      if(!btn || btn.__aboutBound) return;
      var card = btn.parentElement; // the rounded-xl border-2 wrapper
      if(!card) return;
      btn.__aboutBound = true;
      btn.__accBound = true; // skip generic accordion handler

      // Build the panel
      var panel = document.createElement("div");
      panel.className = "px-5 pb-5 text-slate-800 border-t border-slate-200";
      panel.style.display = "none";
      var p = document.createElement("p");
      p.className = "leading-relaxed font-semibold mt-4";
      p.textContent = body;
      panel.appendChild(p);
      card.appendChild(panel);

      var chev = btn.querySelector("svg");
      var open = false;
      btn.addEventListener("click", function(e){
        e.preventDefault();
        open = !open;
        panel.style.display = open ? "" : "none";
        if(chev){ chev.classList.toggle("rotate-180", open); }
      });
    });
  }

  // ---------- Mission "See more" — inject Future Scope on demand ----------
  // The static export only renders the collapsed state of the Mission card.
  // Find the "See more" button by its sibling <p><strong>Current Mission —</strong></p>
  // and inject the Future Scope paragraph + toggle on click.
  var FUTURE_SCOPE_TEXT = "To evolve Qcmetric and the Aurexa ecosystem into a predictive quality intelligence platform: Integrating automated controls, AI-driven risk indicators, and cross-system intelligence so compliance moves from checklist to continuous assurance.";
  function initMissionExpand(root){
    var strongs = (root||document).querySelectorAll('p > strong');
    strongs.forEach(function(s){
      var t = (s.textContent || "").trim();
      if(t.indexOf("Current Mission") !== 0) return;
      var p = s.parentElement;
      if(!p || p.__missionBound) return;
      // Find the See more/See less button as the next sibling of the <p>
      var btn = p.nextElementSibling;
      while(btn && btn.tagName !== "BUTTON"){ btn = btn.nextElementSibling; }
      if(!btn) return;
      p.__missionBound = true;
      btn.__accBound = true; // prevent generic accordion handler from binding

      // Create the Future Scope paragraph (initially hidden)
      var future = document.createElement("p");
      future.className = "text-black mt-3 leading-relaxed";
      future.style.display = "none";
      var strong = document.createElement("strong");
      strong.textContent = "Future Scope — ";
      future.appendChild(strong);
      future.appendChild(document.createTextNode(FUTURE_SCOPE_TEXT));
      p.parentNode.insertBefore(future, btn);

      var open = false;
      function render(){
        future.style.display = open ? "" : "none";
        btn.innerHTML = open
          ? 'See less <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"></path></svg>'
          : 'See more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"></path></svg>';
      }
      btn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        open = !open;
        render();
      });
      render();
    });
  }

  // ---------- Forms -> mailto: ----------
  function initForms(root){
    var formCfg = {
      "contact":   { to: "contact@aurexatech.com", subject: "Contact form — Aurexa website" },
      "book-demo": { to: "contact@aurexatech.com", subject: "Demo request — Aurexa website" },
      "careers":   { to: "careers@aurexatech.com", subject: "Job application — Aurexa website" }
    };
    var forms = (root||document).querySelectorAll("form");
    forms.forEach(function(form){
      if(form.__mailBound) return; form.__mailBound = true;
      var pageId = (form.closest(".page-section")||{}).getAttribute && form.closest(".page-section").getAttribute("data-page");
      var cfg = formCfg[pageId] || { to: "contact@aurexatech.com", subject: "Aurexa website enquiry" };
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var lines = [];
        var fd = new FormData(form);
        fd.forEach(function(v, k){
          if(typeof v === "string" && v.trim()){
            lines.push(k + ": " + v);
          } else if(v && v.name){
            lines.push(k + ": [file] " + v.name);
          }
        });
        // also pick up unnamed selects/inputs by label
        var subj = cfg.subject;
        var subjField = form.querySelector('[name="subject"],[name="role"],[name="position"]');
        if(subjField && subjField.value) subj = cfg.subject + " — " + subjField.value;
        var body = lines.join("\\n");
        var url = "mailto:" + cfg.to +
          "?subject=" + encodeURIComponent(subj) +
          "&body=" + encodeURIComponent(body);
        window.location.href = url;
        // show success-style feedback
        var note = document.createElement("div");
        note.className = "mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm";
        note.textContent = "Opening your email client… If nothing happens, please email " + cfg.to + " directly.";
        form.appendChild(note);
      });
    });
  }

  // ---------- Hero slide pager (full slide swap + auto-rotate) ----------
  var HERO_SLIDES = [
    { headline: "Where Innovation Meets Compliance, and Technology Drives Growth.",
      description: "Aurexa Technologies delivers enterprise digital platforms and managed services designed to simplify compliance, strengthen operational control, and improve quality outcomes across regulated industries.",
      bg: "from-brand-blue/40 via-brand-teal/20 to-brand-blueDark/60",
      imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" },
    { headline: "Fully Auditable Processes & Real-Time Visibility",
      description: "Our solutions help organizations establish fully auditable processes, streamline complex workflows, and gain real-time visibility into critical business operations. By combining compliance-focused architecture with scalable cloud technologies, we enable businesses to manage quality, documentation, training, approvals, and regulatory requirements through a secure and centralized ecosystem.",
      bg: "from-brand-teal/40 via-brand-blue/20 to-brand-tealDark/60",
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" },
    { headline: "Empowering Regulated Industries",
      description: "At Aurexa Technologies, we empower regulated industries with intelligent digital platforms and managed services that drive compliance, operational excellence, and business transformation. Our enterprise-grade solutions are designed to simplify complex regulatory processes, enhance quality management, and provide organizations with complete visibility and control across critical operations.",
      bg: "from-brand-accent/40 via-brand-blue/20 to-brand-blueDark/60",
      imageUrl: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" },
    { headline: "Scalable, Secure & Compliance-Driven Platforms",
      description: "We specialize in delivering scalable, secure, and compliance-driven platforms that help businesses automate workflows, maintain data integrity, and achieve continuous regulatory readiness. From quality management and document control to training, approvals, audits, and compliance tracking, our solutions create a centralized digital ecosystem that supports efficiency, transparency, and accountability.",
      bg: "from-brand-tealDark/40 via-brand-blue/20 to-brand-blueDark/60",
      imageUrl: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" },
    { headline: "Innovation & Industry Best Practices",
      description: "With a strong focus on innovation and industry best practices, Aurexa Technologies enables organizations to modernize legacy processes, reduce operational risk, and accelerate decision-making through real-time insights and intelligent automation.",
      bg: "from-brand-blue/40 via-brand-accent/20 to-brand-tealDark/60",
      imageUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" }
  ];
  var BG_CLASSES_ALL = HERO_SLIDES.reduce(function(acc,s){ return acc.concat(s.bg.split(/\\s+/)); }, []);

  function initHeroPager(root){
    var hero = (root||document).querySelector('section.gradient-hero');
    if(!hero || hero.__heroBound) return;
    hero.__heroBound = true;

    // Resolve the image div, gradient overlay, headline, description elements
    var bgWrapper = hero.querySelector('div.absolute.inset-0');
    if(!bgWrapper) return;
    var imageDiv = bgWrapper.querySelector('div.bg-cover.bg-center');
    var gradientDiv = bgWrapper.querySelectorAll('div.absolute.inset-0')[0];
    var headline = hero.querySelector('h1');
    var description = hero.querySelector('p.lede') || hero.querySelector('p');
    var dots = hero.querySelectorAll('[aria-label^="Slide "]');
    var prev = hero.querySelector('[aria-label="Previous slide"]');
    var next = hero.querySelector('[aria-label="Next slide"]');
    var pauseBtn = hero.querySelector('[aria-label="Pause"],[aria-label="Play"]');
    var counter = hero.querySelector('span.text-brand-teal.text-xl');
    if(!dots.length || !headline || !description || !imageDiv || !gradientDiv) return;

    var active = 0;
    var paused = false;
    var timer = null;

    function paint(){
      var s = HERO_SLIDES[active] || HERO_SLIDES[0];
      headline.textContent = s.headline;
      description.textContent = s.description;
      imageDiv.style.backgroundImage = "url(" + s.imageUrl + ")";
      // swap gradient classes
      BG_CLASSES_ALL.forEach(function(c){ gradientDiv.classList.remove(c); });
      s.bg.split(/\\s+/).forEach(function(c){ if(c) gradientDiv.classList.add(c); });
      // dots
      dots.forEach(function(b,i){
        b.classList.toggle("bg-brand-teal", i===active);
        b.classList.toggle("w-6",          i===active);
        b.classList.toggle("bg-white/40", i!==active);
      });
      if(counter) counter.textContent = String(active+1);
    }

    function go(i){ active = (i + HERO_SLIDES.length) % HERO_SLIDES.length; paint(); restart(); }
    function restart(){
      if(timer){ clearInterval(timer); timer = null; }
      if(!paused) timer = setInterval(function(){ active = (active + 1) % HERO_SLIDES.length; paint(); }, 4000);
    }

    dots.forEach(function(b,i){ b.addEventListener("click", function(){ go(i); }); });
    if(prev) prev.addEventListener("click", function(){ go(active - 1); });
    if(next) next.addEventListener("click", function(){ go(active + 1); });
    if(pauseBtn){
      pauseBtn.addEventListener("click", function(){
        paused = !paused;
        pauseBtn.setAttribute("aria-label", paused ? "Play" : "Pause");
        // swap icon: replace the inline SVG with a play or pause glyph
        var svg = pauseBtn.querySelector("svg");
        if(svg){
          svg.outerHTML = paused
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>';
        }
        restart();
      });
    }

    paint();
    restart();
  }

  // ---------- Header link + menu binding ----------
  function bindHeader(){
    var header = document.querySelector("header");
    if(!header) return;
    var btn = header.querySelector('button[aria-label="Menu"]');
    if(btn && !btn.__bound){ btn.__bound = true; btn.addEventListener("click", toggleMobileMenu); }
  }

  // ---------- Careers: Apply button -> application modal ----------
  function ensureApplyModal(){
    var existing = document.getElementById("apply-modal");
    if(existing) return existing;
    var modal = document.createElement("div");
    modal.id = "apply-modal";
    modal.style.cssText = "position:fixed;inset:0;z-index:60;display:none;align-items:flex-start;justify-content:center;padding:1rem;background:rgba(0,0,0,0.5);overflow-y:auto;";
    modal.innerHTML = ''
      + '<div style="background:#fff;border-radius:1rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);width:100%;max-width:42rem;margin:2rem auto;">'
      +   '<div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #e2e8f0;padding:1.5rem;display:flex;align-items:center;justify-content:space-between;border-radius:1rem 1rem 0 0;">'
      +     '<div><h2 style="font-size:1.5rem;font-weight:700;color:#0f172a;margin:0;">Apply for Position</h2>'
      +     '<p id="apply-role" style="font-size:0.875rem;color:#475569;margin:0.25rem 0 0;"></p></div>'
      +     '<button type="button" id="apply-close" aria-label="Close" style="padding:0.5rem;border:0;background:transparent;cursor:pointer;border-radius:0.5rem;font-size:1.5rem;line-height:1;color:#475569;">&times;</button>'
      +   '</div>'
      +   '<form id="apply-form" style="padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem;">'
      +     '<input type="hidden" name="role" id="apply-role-input" />'
      +     '<div><h3 style="font-size:1.125rem;font-weight:600;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:0.5rem;margin:0 0 0.75rem;">Personal Information</h3>'
      +       '<label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Full Name <span style="color:#ef4444;">*</span></label>'
      +       '<input name="fullName" type="text" required placeholder="Enter your full name" style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" />'
      +     '</div>'
      +     '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">'
      +       '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Email <span style="color:#ef4444;">*</span></label>'
      +         '<input name="email" type="email" required placeholder="you@example.com" style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" /></div>'
      +       '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Phone <span style="color:#ef4444;">*</span></label>'
      +         '<input name="phone" type="tel" required placeholder="+91 9876543210" style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" /></div>'
      +     '</div>'
      +     '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">'
      +       '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">LinkedIn</label>'
      +         '<input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" /></div>'
      +       '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Current Location <span style="color:#ef4444;">*</span></label>'
      +         '<input name="currentLocation" type="text" required placeholder="City, Country" style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" /></div>'
      +     '</div>'
      +     '<div><h3 style="font-size:1.125rem;font-weight:600;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:0.5rem;margin:0 0 0.75rem;">Resume &amp; Documents</h3>'
      +       '<label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.5rem;">Upload Resume <span style="color:#ef4444;">*</span></label>'
      +       '<input name="resume" type="file" required accept=".pdf,.doc,.docx" style="width:100%;padding:0.5rem;border:2px dashed #cbd5e1;border-radius:0.5rem;font-size:0.875rem;" />'
      +       '<p style="font-size:0.75rem;color:#64748b;margin:0.25rem 0 0;">PDF or Word (Max 5MB)</p>'
      +     '</div>'
      +     '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Cover Letter</label>'
      +       '<textarea name="coverLetter" rows="4" placeholder="Tell us about your background..." style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;resize:vertical;"></textarea></div>'
      +     '<div><h3 style="font-size:1.125rem;font-weight:600;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:0.5rem;margin:0 0 0.75rem;">Short Answer</h3>'
      +       '<label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Why do you want to join Aurexa? <span style="color:#ef4444;">*</span></label>'
      +       '<textarea name="whyJoin" rows="5" required placeholder="Share your motivation..." style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;resize:vertical;"></textarea>'
      +     '</div>'
      +     '<div><label style="display:block;font-size:0.875rem;font-weight:500;color:#334155;margin-bottom:0.25rem;">Professional References</label>'
      +       '<textarea name="references" rows="4" placeholder="2-3 references with name, title, company, email, phone" style="width:100%;padding:0.5rem 1rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:0.875rem;resize:vertical;"></textarea>'
      +       '<p style="font-size:0.75rem;color:#64748b;margin:0.25rem 0 0;">Optional</p></div>'
      +     '<div id="apply-status"></div>'
      +     '<div style="display:flex;gap:0.75rem;padding-top:1rem;border-top:1px solid #e2e8f0;">'
      +       '<button type="button" id="apply-cancel" style="flex:1;padding:0.75rem 1.5rem;border:1px solid #cbd5e1;background:#fff;border-radius:0.5rem;color:#334155;font-weight:600;cursor:pointer;">Cancel</button>'
      +       '<button type="submit" style="flex:1;padding:0.75rem 1.5rem;background:#0066b2;color:#fff;border:0;border-radius:0.5rem;font-weight:600;cursor:pointer;">Submit Application</button>'
      +     '</div>'
      +   '</form>'
      + '</div>';
    document.body.appendChild(modal);

    function close(){ modal.style.display = "none"; document.body.style.overflow = ""; }
    modal.querySelector("#apply-close").addEventListener("click", close);
    modal.querySelector("#apply-cancel").addEventListener("click", close);
    modal.addEventListener("click", function(e){ if(e.target === modal) close(); });

    modal.querySelector("#apply-form").addEventListener("submit", function(e){
      e.preventDefault();
      var form = e.target;
      var fd = new FormData(form);
      var role = fd.get("role") || "";
      var lines = ["Role: " + role, ""];
      ["fullName","email","phone","linkedin","currentLocation"].forEach(function(k){
        var v = fd.get(k); if(v) lines.push(k + ": " + v);
      });
      lines.push("");
      var cl = fd.get("coverLetter"); if(cl) lines.push("Cover Letter:\\n" + cl + "\\n");
      var wj = fd.get("whyJoin"); if(wj) lines.push("Why Join:\\n" + wj + "\\n");
      var rf = fd.get("references"); if(rf) lines.push("References:\\n" + rf + "\\n");
      var resume = fd.get("resume");
      if(resume && resume.name) lines.push("Resume: [attached separately] " + resume.name + " (" + Math.round(resume.size/1024) + " KB)");
      var subject = "Job Application — " + role;
      var body = lines.join("\\n");
      var url = "mailto:careers@aurexatech.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      window.location.href = url;
      var status = modal.querySelector("#apply-status");
      status.innerHTML = '<div style="padding:1rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:0.5rem;color:#166534;font-size:0.875rem;">Opening your email client… Please attach your resume manually before sending. If nothing happens, email <strong>careers@aurexatech.com</strong> directly.</div>';
    });

    return modal;
  }

  function openApplyModal(roleTitle){
    var modal = ensureApplyModal();
    modal.querySelector("#apply-role").textContent = roleTitle || "";
    modal.querySelector("#apply-role-input").value = roleTitle || "";
    var status = modal.querySelector("#apply-status"); if(status) status.innerHTML = "";
    var form = modal.querySelector("#apply-form"); if(form) form.reset();
    modal.querySelector("#apply-role-input").value = roleTitle || "";
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function initApplyButtons(root){
    var careers = (root||document).querySelector('.page-section[data-page="careers"]');
    if(!careers) return;
    var btns = careers.querySelectorAll("button");
    btns.forEach(function(btn){
      if(btn.__applyBound) return;
      if((btn.textContent||"").trim() !== "Apply") return;
      btn.__applyBound = true;
      btn.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        var details = btn.closest("details");
        var role = details ? (details.querySelector("summary")||{}).textContent || "" : "";
        openApplyModal(role.trim());
      });
    });
  }

  // ---------- Initial wiring ----------
  function initAll(){
    bindHeader();
    initFlipCards(document);
    initMissionExpand(document);
    initAboutTiles(document);
    initAccordions(document);
    initForms(document);
    initHeroPager(document);
    initApplyButtons(document);
    // Reveal initial visibility=0 hero block (Next had animation)
    document.querySelectorAll('[style*="opacity:0"]').forEach(function(el){
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    showPage(parseHash());
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initAll);
  } else { initAll(); }
})();
`;

// ---------- Compose the final HTML ----------
const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
<title>Aurexa Technologies — Enterprise Digital Platforms for Regulated Industries</title>
<meta name="description" content="Aurexa delivers enterprise digital platforms and managed services for regulated industries. Integrated quality, compliance, and operational control. GxP, FDA 21 CFR Part 11, ISO, GDPR, HIPAA ready." />
<meta name="keywords" content="eQMS,QMS,21 CFR Part 11,GxP,Aurexa,Compliance Management,Quality Management,Regulated Industries" />
<style>
${css}
/* Single-file additions */
.page-section { display: none; }
.page-section.is-active { display: block; }
/* Scrolling secondary header marquee (styled-jsx isn't bundled into static export) */
@keyframes aurexa-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
.animate-scroll { animation: aurexa-marquee 25s linear infinite; }
/* Ensure Next-rendered hero blocks aren't permanently hidden by their initial opacity:0 inline style */
html, body { background: #ffffff; }
/* Justify all text content */
p, .lede, li, td, th, div:not(.flex):not(.grid):not(.inline-flex):not([class*="rounded"]):not([class*="button"]) > *:not(button):not(a):not(svg):not(img), 
summary, textarea, .text-content, details div { text-align: justify !important; }
</style>
</head>
<body class="min-h-screen bg-white text-brand-ink antialiased">
${procHeader}
<main class="pt-32">
${procPages.map((p) => `<section class="page-section" data-page="${p.id}">${p.html}</section>`).join("\n")}
</main>
${procFooter}
<script>${runtimeJs}</script>
</body>
</html>
`;

fs.writeFileSync(OUT, out);
console.log("Wrote", OUT, "(" + (out.length/1024).toFixed(1) + " KB)");
