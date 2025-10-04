// FILE: index.js

// CHANGED: Added typewriter animation for hero name on initial page load
(function initTypewriter() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTypewriter);
  } else {
    setupTypewriter();
  }

  function setupTypewriter() {
    const heroName = document.getElementById('hero-name');
    
    if (!heroName) return;

    // Check if animation has already been shown in this session
    const hasShownAnimation = sessionStorage.getItem('typewriter-shown');
    
    if (hasShownAnimation) {
      return; // Don't run animation again
    }

    const originalText = heroName.textContent;
    heroName.textContent = '';
    heroName.classList.add('typing');
    
    let charIndex = 0;
    
    function typeChar() {
      if (charIndex < originalText.length) {
        heroName.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 100); // 100ms delay between characters
      } else {
        // Animation complete
        setTimeout(function() {
          heroName.classList.remove('typing');
          // Mark animation as shown for this session
          sessionStorage.setItem('typewriter-shown', 'true');
        }, 500);
      }
    }
    
    // Start typing after a brief delay
    setTimeout(typeChar, 300);
  }
})();

// CHANGED: Updated theme toggle to work with sun icon for light mode
(function initTheme() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTheme);
  } else {
    setupTheme();
  }

  function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;

    // Default to light theme, load saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
})();

// CHANGED: Enhanced smooth scroll with proper offset calculation
(function initSmoothScroll() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSmoothScroll);
  } else {
    setupSmoothScroll();
  }

  function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 0;
          
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }
})();

// CHANGED: Added IntersectionObserver for scroll-reveal animations
(function initScrollReveal() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollReveal);
  } else {
    setupScrollReveal();
  }

  function setupScrollReveal() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Make all sections visible immediately if user prefers reduced motion
      const sections = document.querySelectorAll('.section');
      sections.forEach(function(section) {
        section.style.opacity = '1';
        section.style.transform = 'none';
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      const sections = document.querySelectorAll('.section');
      
      const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      sections.forEach(function(section) {
        sectionObserver.observe(section);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      const sections = document.querySelectorAll('.section');
      sections.forEach(function(section) {
        section.classList.add('visible');
      });
    }
  }
})();

(function initLazyLoad() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyLoad);
  } else {
    setupLazyLoad();
  }

  function setupLazyLoad() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Check if image is already loaded (from cache)
            if (img.complete) {
              img.style.opacity = '1';
            } else {
              img.addEventListener('load', function() {
                img.style.opacity = '1';
              });
            }
            
            observer.unobserve(img);
          }
        });
      });

      images.forEach(function(img) {
        // Don't hide if already loaded
        if (!img.complete) {
          img.style.opacity = '0';
        }
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
      });
    }
  }
})();

(function initKeyboardNav() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupKeyboardNav);
  } else {
    setupKeyboardNav();
  }

  function setupKeyboardNav() {
    let isUsingKeyboard = false;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      isUsingKeyboard = false;
      document.body.classList.remove('keyboard-nav');
    });
  }
})();