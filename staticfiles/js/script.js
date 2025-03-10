document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Job filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.querySelector('.icon-menu');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            document.documentElement.classList.toggle('menu-open');
            menuButton.classList.toggle('active');
        });
    }

    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.message');
    if (messages.length > 0) {
        setTimeout(function() {
            messages.forEach(message => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    message.remove();
                }, 300);
            });
        }, 5000);
    }
    
    // Form validation visual feedback
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // Job filtering functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const keyword = searchForm.querySelector('input[name="q"]').value;
            const location = searchForm.querySelector('input[name="location"]').value;
            const isRemote = searchForm.querySelector('input[name="remote"]').checked;
            const isFullTime = searchForm.querySelector('input[name="fulltime"]').checked;
            const isPartTime = searchForm.querySelector('input[name="parttime"]').checked;
            
            // Build query string
            const params = new URLSearchParams();
            if (keyword) params.append('q', keyword);
            if (location) params.append('location', location);
            if (isRemote) params.append('remote', '1');
            if (isFullTime) params.append('fulltime', '1');
            if (isPartTime) params.append('parttime', '1');
            
            // Redirect to jobs page with filters
            window.location.href = `/jobs?${params.toString()}`;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});
