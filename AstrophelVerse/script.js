document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from(".hero h2", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    gsap.from(".hero p", {
      y: 100,
      opacity: 0,
      delay: 0.3,
      duration: 1.2,
      ease: "power4.out",
    });

    // Section animations
    gsap.from(".about", {
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.from(".skills", {
      scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.from(".contact", {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.from(".connect", {
      scrollTrigger: {
        trigger: ".connect",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    // Skill tags animation
    gsap.from(".skill-tags span", {
      scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, options);
  sections.forEach(section => {
    // Don't add hidden class initially - let sections be visible
    observer.observe(section);
  });

  // Custom cursor
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-tags span');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = '#ff9800';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--accent)';
      });
    });
  }

  // Loader
  const loader = document.querySelector(".loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1000);
    });
  }

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
      
      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active state to navigation based on scroll position
  const navItems = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});
