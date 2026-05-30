document.addEventListener('DOMContentLoaded', () => {
  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active navigation link highlighting based on current page/scroll
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation || 
        (currentLocation.includes('pages/projects.html') && link.getAttribute('href').includes('projects')) ||
        (currentLocation.includes('pages/education.html') && link.getAttribute('href').includes('education'))) {
      link.classList.add('active');
    }
  });

  // Scroll animations observer
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  // Initial check
  handleScrollAnimation();

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Project filter functionality (if present on page)
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            if (card.classList.contains(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Simple form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your message has been sent successfully (Mock action).');
      contactForm.reset();
    });
  }
});
