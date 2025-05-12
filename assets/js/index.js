document.addEventListener('DOMContentLoaded', function() {
  (function() {
    "use strict";

    // Selector helper function
    const select = (el, all = false) => {
      el = el.trim();
      return all 
        ? [...document.querySelectorAll(el)] 
        : document.querySelector(el);
    };

    // Event listener helper
    const on = (type, el, listener, all = false) => {
      const elements = select(el, all);
      if (elements) {
        if (all) elements.forEach(e => e.addEventListener(type, listener));
        else elements.addEventListener(type, listener);
      }
    };

    // Navbar links active state
    let navbarlinks = select('#navbar .scrollto', true);
    const navbarlinksActive = () => {
      const scrollPos = window.scrollY + 200;
      navbarlinks.forEach(link => {
        if (!link.hash) return;
        const section = select(link.hash);
        if (!section) return;
        const { offsetTop, offsetHeight } = section;
        link.classList.toggle('active', scrollPos >= offsetTop && scrollPos <= offsetTop + offsetHeight);
      });
    };
    window.addEventListener('load', navbarlinksActive);
    window.addEventListener('scroll', navbarlinksActive);

    // Scroll to element with offset
    const scrollto = (target) => {
      const header = select('#header');
      let offset = header.offsetHeight;
      if (!header.classList.contains('header-scrolled')) offset -= 16;
      
      const elementPos = select(target).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    };

    // Mobile navigation handler
    const handleMobileNav = () => {
      const navbar = select('#navbar');
      const toggle = select('.mobile-nav-toggle');
      
      // Toggle menu
      on('click', '.mobile-nav-toggle', function() {
        navbar.classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
        document.body.style.overflow = navbar.classList.contains('navbar-mobile') 
          ? 'hidden' 
          : 'auto';
      });

      // Close menu on link click
      document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
          if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile');
            toggle.classList.replace('bi-x', 'bi-list');
            document.body.style.overflow = 'auto';
          }
        });
      });
    };

    // Smooth scroll handler
    const handleSmoothScroll = () => {
      on('click', '.scrollto', function(e) {
        if (this.hash) {
          e.preventDefault();
          if (select(this.hash)) scrollto(this.hash);
        }
      }, true);
    };

    // Initialize core functionality
    const init = () => {
      handleMobileNav();
      handleSmoothScroll();
      
      // Header fixed on scroll
      const header = select('#header');
      if (header) {
        const headerOffset = header.offsetTop;
        const nextElement = header.nextElementSibling;
        window.addEventListener('scroll', () => {
          header.classList.toggle('fixed-top', window.scrollY > headerOffset);
          nextElement.classList.toggle('scrolled-offset', window.scrollY > headerOffset);
        });
      }

      // Back to top button
      const backtotop = select('.back-to-top');
      if (backtotop) {
        window.addEventListener('scroll', () => {
          backtotop.classList.toggle('active', window.scrollY > 100);
        });
      }
    };

    // Start initialization
    init();

  })();
});