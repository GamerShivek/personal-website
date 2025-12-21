// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', toggleDarkMode);

// Typing effect for home section
document.addEventListener('DOMContentLoaded', function() {
  const homeNameElement = document.querySelector('#home h1');
  const homeNameText = homeNameElement.textContent;
  homeNameElement.textContent = ''; // Clear original text

  function typeWriter(element, text, speed = 200, callback = null) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        setTimeout(callback, 2000); // Pause for 2 sec before erasing
      }
    }
    typing();
  }

  function eraseText(element, callback = null) {
    function erasing() {
      if (element.textContent.length > 0) {
        element.textContent = element.textContent.slice(0, -1);
        setTimeout(erasing, 50);
      } else if (callback) {
        callback();
      }
    }
    erasing();
  }

  function typeLoop() {
    typeWriter(homeNameElement, homeNameText, 100, () => {
      eraseText(homeNameElement, () => {
        typeLoop(); // Restart the loop
      });
    });
  }

  // Start the typing effect
  typeLoop();
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileNavToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  const isOpen = navLinks.classList.contains('active');
  const iconElement = mobileNavToggle.querySelector('i');
  
  if (isOpen) {
    iconElement.classList.remove('fa-bars');
    iconElement.classList.add('fa-times');
  } else {
    iconElement.classList.remove('fa-times');
    iconElement.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking nav links
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const iconElement = mobileNavToggle.querySelector('i');
    iconElement.classList.remove('fa-times');
    iconElement.classList.add('fa-bars');
  });
});

// Form submission without any backend functionality
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});

// Section Title Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  // Create Intersection Observer for section titles
  const sectionTitles = document.querySelectorAll('.section-title');
  
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing this specific element once it's been animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing each section title
  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });
});

// Carousel implementation
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const totalItems = items.length;
  
  // Function to update carousel position
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Event listeners for buttons
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });
  
  // Event listeners for dots
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateCarousel();
    });
  });
  
  // Touch events for mobile support
  // This code was generated by LLM
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left - go to next
        currentIndex = (currentIndex + 1) % totalItems;
      } else {
        // Swipe right - go to previous
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      }
      updateCarousel();
    }
  }
  
  // Keyboard navigation using arrow keys for image scrolling
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }
  });
});

// The shooting star code was written using LLM
// Shooting Stars in Dark Mode
function createShootingStar() {
  if (!document.body.classList.contains('dark-mode')) return;

  const star = document.createElement('div');
  star.classList.add('shooting-star');
  
  // Random starting position from top-left corner
  const startX = Math.random() * (window.innerWidth * 0.5);
  const startY = Math.random() * (window.innerHeight * 0.5);
  
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  
  document.body.appendChild(star);
  
  // Remove star after animation completes
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

// Create stars at regular intervals when in dark mode
function startShootingStars() {
  if (document.body.classList.contains('dark-mode')) {
    createShootingStar();
  }
  setTimeout(startShootingStars, Math.random() * 500 + 500); // Random interval between 0.5-1 seconds
}

// Start the shooting stars when page loads
document.addEventListener('DOMContentLoaded', () => {
  startShootingStars();
});

// Update the existing toggleDarkMode function to restart stars
const originalToggleDarkMode = toggleDarkMode;
toggleDarkMode = function() {
  originalToggleDarkMode();
  if (document.body.classList.contains('dark-mode')) {
    startShootingStars();
  }
};
