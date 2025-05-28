// Scroll-triggered animations
function initScrollAnimations() {
  // Create intersection observer with proper settings
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% into viewport
    threshold: 0.1 // Element needs to be 10% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetIdentifier = entry.target.id ? `#${entry.target.id}` : (entry.target.className && typeof entry.target.className === 'string' ? `.${entry.target.className.split(' ').join('.')}` : 'UnnamedElement');

        // Add a small delay to ensure smooth animation
        setTimeout(() => {
          entry.target.classList.add('visible');

          // Check if the animated element is our-story-section
          if (entry.target.id === 'our-story-section') {

            const paragraphs = entry.target.querySelectorAll('p.sequential-fade');
            paragraphs.forEach((p, index) => {
              setTimeout(() => {
                p.classList.add('is-visible');

              }, index * 750); // 0.75s delay for each subsequent paragraph
            });
          }

          // Check if this is the parent section containing the delayed-fade element
          if (entry.target.classList.contains('css-op4k87') && entry.target.classList.contains('css-5asuez')) {
            const delayedElement = entry.target.querySelector('.delayed-fade');
            if (delayedElement) {
              setTimeout(() => {
                delayedElement.classList.add('visible');
              }, 1000); // 1 second delay
            }
          }
        }, 100);
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements that already have fade-in-on-scroll class
  document.querySelectorAll('.fade-in-on-scroll').forEach((el, index) => {

    observer.observe(el);
  });

  // Special handling for footer section
  const footerSection = document.querySelector('.footer-section');
  if (footerSection) {

    // Force reset the footer to ensure it starts hidden
    footerSection.classList.remove('visible');
    observer.observe(footerSection);
  }
}

// Smooth scroll functionality for internal links
function initSmoothScroll() {

  const scrollLinks = document.querySelectorAll('.scroll-link');


  scrollLinks.forEach((link, index) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Remove visible class to retrigger animation
        targetElement.classList.remove('visible');

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Retrigger animation after scroll
        setTimeout(() => {
          targetElement.classList.add('visible');

        }, 500);
      } else {

      }
    });

    // Also add mousedown event as backup
    link.addEventListener('mousedown', function (e) {
    });
  });
}

// Alternative click handler setup
function setupContactClick() {
  // Try multiple approaches to catch the click
  const contactLinks = document.querySelectorAll('a[href="#contact-section"], .scroll-link');
  const contactParents = document.querySelectorAll('.css-yujnmi');

  // Add click handler to parent elements containing "Contact us" or "Our story"
  contactParents.forEach(parent => {
    if (parent.textContent.includes('Contact us')) {

      parent.style.cursor = 'pointer';
      parent.addEventListener('click', function (e) {
        const targetElement = document.getElementById('contact-section');
        if (targetElement) {
          e.preventDefault();
          targetElement.classList.remove('visible');

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => {
            targetElement.classList.add('visible');

          }, 500);
        }
      });
    }

    if (parent.textContent.includes('Our story')) {

      parent.style.cursor = 'pointer';
      parent.addEventListener('click', function (e) {
        const targetElement = document.getElementById('our-story-section');
        if (targetElement) {
          e.preventDefault();
          targetElement.classList.remove('visible');

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => {
            targetElement.classList.add('visible');

          }, 500);
        }
      });
    }
  });

  // Also try to find and setup click on the specific contact and our story links
  const allParagraphs = document.querySelectorAll('p');
  allParagraphs.forEach(p => {
    if (p.textContent.includes('Contact us')) {

      p.style.cursor = 'pointer';
      p.addEventListener('click', function (e) {
        const targetElement = document.getElementById('contact-section');
        if (targetElement) {
          e.preventDefault();
          targetElement.classList.remove('visible');

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => {
            targetElement.classList.add('visible');

          }, 500);
        }
      });
    }

    if (p.textContent.includes('Our story')) {

      p.style.cursor = 'pointer';
      p.addEventListener('click', function (e) {
        const targetElement = document.getElementById('our-story-section');
        if (targetElement) {
          e.preventDefault();
          targetElement.classList.remove('visible');

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => {
            targetElement.classList.add('visible');

          }, 500);
        }
      });
    }
  });
}

// Dynamic logo switching based on background sections
function initLogoSwitching() {
  const topLogo = document.querySelector('.css-e8fnbp img'); // Top navigation logo
  const darkLogoSrc = './image/4f75f5eee38961071c7e4314f2901bdc944c0133.svg';
  const lightLogoSrc = './image/9f2c86bf58607377f75e6b87b22f6680718e8c22.svg';
  
  if (!topLogo) return;
  
  // Define light background sections by their selectors or elements
  const lightSections = [
    document.querySelector('#our-story-section'), // Story section
    document.querySelector('#contact-section'), // Contact section  
    document.querySelector('.footer-section'), // Footer section        
  ].filter(Boolean); // Remove any null elements
  
  function checkLogoVisibility() {
    const logoRect = topLogo.getBoundingClientRect();
    const logoCenter = logoRect.top + logoRect.height / 2;
    
    // Check if logo center intersects with any light background section
    let isOverLightSection = false;
    
    for (const section of lightSections) {
      const sectionRect = section.getBoundingClientRect();
      if (logoCenter >= sectionRect.top && logoCenter <= sectionRect.bottom) {
        isOverLightSection = true;
        break;
      }
    }
    
    // Switch logo based on background
    const currentSrc = topLogo.getAttribute('src');
    const targetSrc = isOverLightSection ? lightLogoSrc : darkLogoSrc;
    
    if (currentSrc !== targetSrc) {
      topLogo.setAttribute('src', targetSrc);
    }
  }
  
  // Check on scroll and resize
  window.addEventListener('scroll', checkLogoVisibility);
  window.addEventListener('resize', checkLogoVisibility);
  
  // Initial check
  checkLogoVisibility();
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSmoothScroll();
  setupContactClick();
  initLogoSwitching();
});
