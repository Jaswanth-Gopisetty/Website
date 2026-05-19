// Aurexa Technologies - Static Website JavaScript

// ============================================
// MOBILE MENU
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const icon = menuBtn.querySelector('svg use');
      if (icon) {
        const currentHref = icon.getAttribute('href');
        icon.setAttribute('href', currentHref === '#icon-menu' ? '#icon-x' : '#icon-menu');
      }
    });
  }
});

// ============================================
// HERO CAROUSEL
// ============================================
const heroCarousel = {
  currentSlide: 0,
  isPaused: false,
  autoplayInterval: null,
  
  slides: [
    {
      headline: "Where Innovation Meets Compliance, and Technology Drives Growth.",
      description: "Aurexa Technologies delivers enterprise digital platforms and managed services designed to simplify compliance, strengthen operational control, and improve quality outcomes across regulated industries.",
      bg: "linear-gradient(135deg, rgba(10, 42, 102, 0.4) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(6, 26, 64, 0.6) 100%)",
      imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    },
    {
      headline: "Fully Auditable Processes & Real-Time Visibility",
      description: "Our solutions help organizations establish fully auditable processes, streamline complex workflows, and gain real-time visibility into critical business operations. By combining compliance-focused architecture with scalable cloud technologies, we enable businesses to manage quality, documentation, training, approvals, and regulatory requirements through a secure and centralized ecosystem.",
      bg: "linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(10, 42, 102, 0.2) 50%, rgba(15, 118, 110, 0.6) 100%)",
      imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    },
    {
      headline: "Empowering Regulated Industries",
      description: "At Aurexa Technologies, we empower regulated industries with intelligent digital platforms and managed services that drive compliance, operational excellence, and business transformation. Our enterprise-grade solutions are designed to simplify complex regulatory processes, enhance quality management, and provide organizations with complete visibility and control across critical operations.",
      bg: "linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(10, 42, 102, 0.2) 50%, rgba(6, 26, 64, 0.6) 100%)",
      imageUrl: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    },
    {
      headline: "Scalable, Secure & Compliance-Driven Platforms",
      description: "We specialize in delivering scalable, secure, and compliance-driven platforms that help businesses automate workflows, maintain data integrity, and achieve continuous regulatory readiness. From quality management and document control to training, approvals, audits, and compliance tracking, our solutions create a centralized digital ecosystem that supports efficiency, transparency, and accountability.",
      bg: "linear-gradient(135deg, rgba(15, 118, 110, 0.4) 0%, rgba(10, 42, 102, 0.2) 50%, rgba(6, 26, 64, 0.6) 100%)",
      imageUrl: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    },
    {
      headline: "Innovation & Industry Best Practices",
      description: "With a strong focus on innovation and industry best practices, Aurexa Technologies enables organizations to modernize legacy processes, reduce operational risk, and accelerate decision-making through real-time insights and intelligent automation.",
      bg: "linear-gradient(135deg, rgba(10, 42, 102, 0.4) 0%, rgba(124, 58, 237, 0.2) 50%, rgba(15, 118, 110, 0.6) 100%)",
      imageUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    }
  ],
  
  init() {
    if (!document.querySelector('.hero-card')) return;
    
    this.updateSlide();
    this.startAutoplay();
    
    // Navigation buttons
    document.querySelectorAll('.slide-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (index === 0) this.prevSlide();
        else this.nextSlide();
      });
    });
    
    // Dot indicators
    document.querySelectorAll('.slide-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentSlide = index;
        this.updateSlide();
      });
    });
    
    // Play/Pause button
    const playPauseBtn = document.querySelector('.play-pause-btn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        this.togglePause();
      });
    }
  },
  
  updateSlide() {
    const slide = this.slides[this.currentSlide];
    
    // Update background image
    const bgImage = document.querySelector('.hero-bg-image');
    if (bgImage) {
      bgImage.style.backgroundImage = `url(${slide.imageUrl})`;
    }
    
    // Update overlay gradient
    const overlay = document.querySelector('.hero-bg-overlay');
    if (overlay) {
      overlay.style.background = slide.bg;
    }
    
    // Update text content with fade effect
    const card = document.querySelector('.hero-card');
    if (card) {
      card.style.opacity = '0';
      setTimeout(() => {
        document.querySelector('.hero-title').textContent = slide.headline;
        document.querySelector('.hero-description').textContent = slide.description;
        card.style.opacity = '1';
      }, 300);
    }
    
    // Update dots
    document.querySelectorAll('.slide-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
    
    // Update counter
    const counter = document.querySelector('.slide-counter .current');
    if (counter) {
      counter.textContent = this.currentSlide + 1;
    }
  },
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlide();
  },
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlide();
  },
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 4000);
  },
  
  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.querySelector('.play-pause-btn');
    const icon = btn?.querySelector('svg use');
    if (icon) {
      icon.setAttribute('href', this.isPaused ? '#icon-play' : '#icon-pause');
    }
  }
};

// Initialize hero carousel
document.addEventListener('DOMContentLoaded', () => {
  heroCarousel.init();
});

// ============================================
// FLIP CARDS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Handle flip cards on mobile (tap to flip)
  const flipCards = document.querySelectorAll('.flip-card-container');
  
  flipCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (window.innerWidth < 768) {
        card.classList.toggle('flipped');
      }
    });
  });
});

// ============================================
// EXPANDABLE SECTIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const expandables = document.querySelectorAll('.expandable-header');
  
  expandables.forEach(header => {
    header.addEventListener('click', () => {
      const expandable = header.parentElement;
      
      // Toggle active class
      expandable.classList.toggle('active');
      
      // Close other expandables in the same container (optional)
      const container = expandable.parentElement;
      if (container.classList.contains('expandable-group')) {
        container.querySelectorAll('.expandable').forEach(item => {
          if (item !== expandable) {
            item.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Open first expandable by default
  const firstExpandable = document.querySelector('.expandable');
  if (firstExpandable) {
    firstExpandable.classList.add('active');
  }
});

// ============================================
// CONTACT FORM
// ============================================
function handleContactForm(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const errorEl = document.getElementById('contact-error');
  const successEl = document.getElementById('contact-success');
  
  // Clear previous messages
  if (errorEl) errorEl.textContent = '';
  if (successEl) successEl.textContent = '';
  
  // Show loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }
  
  // Get form data
  const formData = {
    type: form.querySelector('[name="type"]').value,
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    message: form.querySelector('[name="message"]').value
  };
  
  // Simulate API call (replace with actual endpoint)
  setTimeout(() => {
    // Generate reference
    const reference = 'ARX-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    
    // Show success message
    if (successEl) {
      successEl.textContent = `Thanks! Reference: ${reference}. SLA: Sales 1–2 business days · Support ≤ 4 hours for critical.`;
    }
    
    // Reset form
    form.reset();
    
    // Reset button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  }, 1000);
}

// ============================================
// BOOK DEMO FORM
// ============================================
let bookingStep = 1;
let bookingData = {
  name: '',
  email: '',
  org: '',
  industry: '',
  customIndustry: '',
  comments: '',
  date: '',
  window: '',
  note: '',
  region: 'USA'
};

function initBookDemoForm() {
  const form = document.getElementById('book-demo-form');
  if (!form) return;
  
  // Show initial step
  showBookingStep(1);
  
  // Handle industry change
  const industrySelect = document.getElementById('industry');
  const customIndustryInput = document.getElementById('custom-industry');
  if (industrySelect && customIndustryInput) {
    industrySelect.addEventListener('change', (e) => {
      const customDiv = customIndustryInput.parentElement;
      if (e.target.value === 'Other') {
        customDiv.style.display = 'block';
      } else {
        customDiv.style.display = 'none';
        customIndustryInput.value = '';
      }
    });
  }
  
  // Handle date change
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      checkAvailability(e.target.value);
    });
  }
}

function showBookingStep(step) {
  bookingStep = step;
  
  // Hide all steps
  document.querySelectorAll('.booking-step').forEach(el => {
    el.style.display = 'none';
  });
  
  // Show current step
  const currentStep = document.getElementById(`step-${step}`);
  if (currentStep) {
    currentStep.style.display = 'block';
  }
  
  // Update step indicators
  document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
    const stepNum = index + 1;
    if (stepNum < step) {
      indicator.classList.add('completed');
      indicator.classList.remove('active');
    } else if (stepNum === step) {
      indicator.classList.add('active');
      indicator.classList.remove('completed');
    } else {
      indicator.classList.remove('active', 'completed');
    }
  });
}

function nextBookingStep() {
  // Validate current step
  if (bookingStep === 1) {
    const name = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const org = document.getElementById('booking-org').value.trim();
    const industry = document.getElementById('industry').value;
    const customIndustry = document.getElementById('custom-industry').value.trim();
    
    if (!name || !email || !org || !industry) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (industry === 'Other' && !customIndustry) {
      alert('Please specify your industry');
      return;
    }
    
    bookingData.name = name;
    bookingData.email = email;
    bookingData.org = org;
    bookingData.industry = industry;
    bookingData.customIndustry = customIndustry;
    bookingData.comments = document.getElementById('booking-comments').value;
  }
  
  showBookingStep(bookingStep + 1);
}

function prevBookingStep() {
  showBookingStep(bookingStep - 1);
}

function checkAvailability(date) {
  const windowsContainer = document.getElementById('time-windows');
  if (!windowsContainer) return;
  
  windowsContainer.innerHTML = '<p style="text-align: center; color: #64748b;">Checking availability...</p>';
  
  // Simulate availability check
  setTimeout(() => {
    const windows = [
      { time: 'Mon–Fri  09:00 – 10:00 CT', available: 87 },
      { time: 'Mon–Fri  14:00 – 15:00 CT', available: 45 },
      { time: 'Mon–Fri  16:00 – 17:00 CT', available: 12 }
    ];
    
    let html = '<div style="display: grid; gap: 0.5rem;">';
    windows.forEach(w => {
      const availableClass = w.available > 50 ? 'high' : w.available > 20 ? 'medium' : 'low';
      const badgeColor = w.available > 50 ? '#d1fae5' : w.available > 20 ? '#fef3c7' : '#fee2e2';
      const textColor = w.available > 50 ? '#065f46' : w.available > 20 ? '#92400e' : '#991b1b';
      
      html += `
        <button type="button" 
          onclick="selectTimeWindow('${w.time}')" 
          style="padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; background: white; text-align: left; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
          onmouseover="this.style.borderColor='#0A2A66'; this.style.background='#f9fafb';"
          onmouseout="this.style.borderColor='#cbd5e1'; this.style.background='white';">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${w.time}</span>
            <span style="background: ${badgeColor}; color: ${textColor}; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">
              ${w.available} seats left
            </span>
          </div>
        </button>
      `;
    });
    html += '</div>';
    
    windowsContainer.innerHTML = html;
  }, 500);
}

function selectTimeWindow(window) {
  bookingData.window = window;
  
  // Update selected state visually
  document.querySelectorAll('#time-windows button').forEach(btn => {
    if (btn.textContent.includes(window)) {
      btn.style.background = '#0A2A66';
      btn.style.color = 'white';
      btn.style.borderColor = '#0A2A66';
    } else {
      btn.style.background = 'white';
      btn.style.color = 'black';
      btn.style.borderColor = '#cbd5e1';
    }
  });
}

function confirmBooking() {
  // Validate step 2
  const date = document.getElementById('booking-date').value;
  const note = document.getElementById('booking-note').value;
  
  if (!date || !bookingData.window) {
    alert('Please select a date and time window');
    return;
  }
  
  bookingData.date = date;
  bookingData.note = note;
  
  // Show loading
  const btn = document.getElementById('confirm-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Booking...';
  }
  
  // Simulate booking
  setTimeout(() => {
    const reference = 'ARX-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    
    // Update confirmation details
    document.getElementById('confirm-name').textContent = bookingData.name.split(' ')[0];
    document.getElementById('confirm-email').textContent = bookingData.email;
    document.getElementById('confirm-org').textContent = bookingData.org;
    document.getElementById('confirm-industry').textContent = 
      bookingData.industry === 'Other' ? bookingData.customIndustry : bookingData.industry;
    document.getElementById('confirm-date').textContent = bookingData.date;
    document.getElementById('confirm-window').textContent = bookingData.window;
    document.getElementById('confirm-reference').textContent = reference;
    
    if (bookingData.note) {
      document.getElementById('confirm-note-row').style.display = 'flex';
      document.getElementById('confirm-note').textContent = bookingData.note;
    }
    
    showBookingStep(3);
  }, 1000);
}

// Initialize book demo form on page load
document.addEventListener('DOMContentLoaded', () => {
  initBookDemoForm();
});

// ============================================
// REGION SWITCHER
// ============================================
const regionData = {
  "USA": {
    phone: "+91 89777 80644",
    address: "Aurexa Technologies (P) LTD, Nellore, Andhra pradesh, India, 524004",
    hours: "Mon–Fri 9:00–18:00 IST"
  },
  "Europe": {
    phone: "+44 20 4525 1010",
    address: "London, United Kingdom",
    hours: "Mon–Fri 9:00–18:00 GMT"
  },
  "Middle East": {
    phone: "+971 4 555 1010",
    address: "Dubai, UAE",
    hours: "Sun–Thu 9:00–18:00 GST"
  },
  "India": {
    phone: "+91 89777 80644",
    address: "Hyderabad, India",
    hours: "Mon–Sat 9:30–18:30 IST"
  }
};

function updateRegion(region) {
  const data = regionData[region];
  if (!data) return;
  
  // Update all region-specific content
  document.querySelectorAll('[data-region-phone]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = `tel:${data.phone}`;
    }
    el.textContent = data.phone;
  });
  
  document.querySelectorAll('[data-region-address]').forEach(el => {
    el.textContent = data.address;
  });
  
  document.querySelectorAll('[data-region-hours]').forEach(el => {
    el.textContent = data.hours;
  });
  
  // Update booking form region
  if (bookingData) {
    bookingData.region = region;
  }
}

// Initialize region switcher
document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.getElementById('region-select');
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      updateRegion(e.target.value);
    });
    
    // Set initial region
    updateRegion(regionSelect.value);
  }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ============================================
// FORM VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc2626';
        } else {
          field.style.borderColor = '#cbd5e1';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields');
      }
    });
  });
});

// ============================================
// CURRENT YEAR IN FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
