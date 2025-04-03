// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor-glow');
    
    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      
      document.addEventListener('mousedown', () => {
        cursor.style.width = '35px';
        cursor.style.height = '35px';
      });
      
      document.addEventListener('mouseup', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
      });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Typing animation
    const typingElement = document.querySelector('.typing-text');
    const words = ['public', 'real-time', 'progress', 'plain sight', 'the open'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isWaiting) {
        setTimeout(typeEffect, 1500);
        isWaiting = false;
        return;
      }
      
      if (isDeleting) {
        // Remove character
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Add character
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      // If word is complete
      if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        isDeleting = true;
        return setTimeout(typeEffect, 1500);
      }
      
      // If deletion is complete
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      
      // Typing speed
      let typeSpeed = isDeleting ? 80 : 120;
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    if (typingElement) {
      setTimeout(typeEffect, 1000);
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.padding = '1rem';
          navLinks.style.backgroundColor = 'var(--bg-color)';
          navLinks.style.boxShadow = 'var(--shadow-md)';
        } else {
          navLinks.style.display = 'none';
        }
      });
      
      // Reset nav on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          navLinks.removeAttribute('style');
          menuToggle.classList.remove('active');
        }
      });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    if (currentTheme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (themeIcon) {
          themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
      });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Only prevent default if it's not a mobile menu toggle
        if (!link.classList.contains('menu-toggle')) {
          e.preventDefault();
          
          const targetId = link.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Close mobile menu if open
            if (menuToggle && menuToggle.classList.contains('active')) {
              menuToggle.click();
            }
            
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavOnScroll() {
      let scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Run once on load
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // For now, just log the data (in a real site, you'd send this to a server)
        console.log('Form submitted:', formObject);
        
        // Show success message
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        `;
      });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.25,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll('.journey-modules > *, .project-card, .blog-entry');
    
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
    
    // Apply animation class when element is in view
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.animated').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
    
    // Module progression animation on hover
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
      const progressBar = card.querySelector('.progress-bar');
      if (progressBar && !card.classList.contains('upcoming')) {
        const originalWidth = progressBar.style.width;
        
        card.addEventListener('mouseenter', () => {
          progressBar.style.width = '100%';
          progressBar.style.transition = 'width 1.5s ease-in-out';
        });
        
        card.addEventListener('mouseleave', () => {
          progressBar.style.width = originalWidth;
        });
      }
    });
  });