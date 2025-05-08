// Mobile Navigation
function setupMobileNavigation() {
  try {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeNav = document.getElementById('closeNav');

    if (mobileNavToggle && mobileNav) {
      mobileNavToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
      });
    }

    if (closeNav && mobileNav) {
      closeNav.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    }
  } catch (error) {
    console.error('Error setting up mobile navigation:', error);
  }
}

// Countdown Timer
function initCountdown() {
  const endDate = new Date("2025-08-08T00:00:00").getTime();
  const countdownEl = document.getElementById('countdown');

  if (!countdownEl) {
    console.error('Countdown element not found');
    return;
  }

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft < 0) {
      // Countdown finished
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial call
  updateCountdown();

  // Update every second
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Optional: Clear interval when page is unloaded
  window.addEventListener('beforeunload', () => {
    clearInterval(countdownInterval);
  });
}

// Parallax Scroll Effect
function setupParallaxEffect() {
  try {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const backgroundImage = document.getElementById('backgroundImage');
      const backgroundOverlay = document.getElementById('backgroundOverlay');
      
      if (backgroundImage && backgroundOverlay) {
        // Smooth parallax effect with perspective
        backgroundImage.style.transform = `translateY(${scrollPosition * 0.3}px) scale(1.05) translateZ(${scrollPosition * 0.1}px)`;
        
        // Progressive blur effect
        const blurAmount = Math.min(scrollPosition / 100, 5);
        backgroundOverlay.style.backdropFilter = `blur(${blurAmount}px)`;
        backgroundOverlay.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
        
        // Add subtle brightness adjustment
        backgroundImage.style.filter = `brightness(${1 - (scrollPosition * 0.0005)}) contrast(${1 + (scrollPosition * 0.0005)})`;
      }
    });
  } catch (error) {
    console.error('Error setting up parallax effect:', error);
  }
}

// Initialize all functionality
function initializeApp() {
  try {
    setupMobileNavigation();
    initCountdown();
    setupParallaxEffect();
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Ensure the script runs after DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}