// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// ===== HERO CAROUSEL =====
let currentSlide = 0;
let isPlaying = true;
let carouselInterval;

const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const playPauseBtn = document.getElementById('playPause');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  currentSlideEl.textContent = index + 1;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startCarousel() {
  isPlaying = true;
  playPauseBtn.classList.remove('paused');
  playPauseBtn.classList.add('playing');
  carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
  isPlaying = false;
  playPauseBtn.classList.remove('playing');
  playPauseBtn.classList.add('paused');
  clearInterval(carouselInterval);
}

// Event listeners
prevBtn.addEventListener('click', () => {
  prevSlide();
  if (isPlaying) {
    stopCarousel();
    startCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  if (isPlaying) {
    stopCarousel();
    startCarousel();
  }
});

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    stopCarousel();
  } else {
    startCarousel();
  }
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    if (isPlaying) {
      stopCarousel();
      startCarousel();
    }
  });
});

// Initialize carousel
totalSlidesEl.textContent = slides.length;
startCarousel();

// ===== ACCORDION =====
function toggleAccordion(index) {
  const accordionCards = document.querySelectorAll('.accordion-card');
  const card = accordionCards[index];
  
  // Close all other accordions
  accordionCards.forEach((c, i) => {
    if (i !== index) {
      c.classList.remove('active');
    }
  });
  
  // Toggle current accordion
  card.classList.toggle('active');
}

// ===== MISSION EXPAND =====
let missionExpanded = false;

function toggleMission() {
  missionExpanded = !missionExpanded;
  const missionFuture = document.getElementById('missionFuture');
  const missionBtnText = document.getElementById('missionBtnText');
  const missionIcon = document.getElementById('missionIcon');
  const btn = document.querySelector('.see-more-btn');
  
  if (missionExpanded) {
    missionFuture.classList.add('expanded');
    missionBtnText.textContent = 'See less';
    btn.classList.add('expanded');
  } else {
    missionFuture.classList.remove('expanded');
    missionBtnText.textContent = 'See more';
    btn.classList.remove('expanded');
  }
}

// ===== CURRENT YEAR =====
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
