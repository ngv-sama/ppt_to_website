// BPA 4.0 Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'all 0.3s ease';
            });

            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(13, 27, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(13, 27, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.problem-card, .step-card, .use-case-card, .result-card, .feature-item, .stat-bar'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // Add the animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stats Counter Animation
    const statElements = document.querySelectorAll('.stat-value, .stat-number, .risk-number');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => counterObserver.observe(el));

    function animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasDollar = text.includes('$');
        const hasM = text.includes('M');
        const hasT = text.includes('T');
        const hasX = text.includes('x');

        // Extract the number
        let num = parseFloat(text.replace(/[^0-9.]/g, ''));

        if (isNaN(num)) return;

        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        const increment = num / steps;

        const timer = setInterval(function() {
            current += increment;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }

            let displayValue = Math.round(current);

            if (num < 10) {
                displayValue = current.toFixed(1);
            }

            let prefix = '';
            let suffix = '';

            if (hasDollar) prefix = '$';
            if (hasM) suffix = 'M';
            if (hasT) suffix = 'T';
            if (hasPercent) suffix = '%';
            if (hasPlus) suffix = '+' + suffix;
            if (hasX) suffix = 'x';

            element.textContent = prefix + displayValue + suffix;
        }, stepTime);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Form validation for CTA buttons (demo purposes)
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Schedule') || this.textContent.includes('Demo')) {
                e.preventDefault();

                // Create and show a modal or scroll to contact form
                showDemoModal();
            }
        });
    });

    function showDemoModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Schedule Your Demo</h3>
                <p>Enter your details and we'll be in touch shortly.</p>
                <form class="demo-form">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Work Email" required>
                    <input type="text" placeholder="Company Name" required>
                    <input type="tel" placeholder="Phone Number">
                    <select required>
                        <option value="">Select Company Size</option>
                        <option value="1-50">1-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                    </select>
                    <button type="submit" class="btn btn-primary">Request Demo</button>
                </form>
            </div>
        `;

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal-overlay.active {
                opacity: 1;
            }
            .modal-content {
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                position: relative;
                transform: translateY(-20px);
                transition: transform 0.3s ease;
            }
            .modal-overlay.active .modal-content {
                transform: translateY(0);
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #6B7280;
            }
            .modal-close:hover {
                color: #111827;
            }
            .modal-content h3 {
                font-size: 1.5rem;
                margin-bottom: 8px;
                color: #111827;
            }
            .modal-content > p {
                color: #6B7280;
                margin-bottom: 24px;
            }
            .demo-form {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .demo-form input,
            .demo-form select {
                padding: 14px 16px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                font-size: 1rem;
                font-family: inherit;
            }
            .demo-form input:focus,
            .demo-form select:focus {
                outline: none;
                border-color: #2196F3;
                box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
            }
            .demo-form .btn {
                margin-top: 8px;
            }
        `;
        document.head.appendChild(modalStyle);

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Trigger animation
        setTimeout(() => overlay.classList.add('active'), 10);

        // Close modal handlers
        const closeBtn = overlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeModal();
        });

        // Form submission
        const form = overlay.querySelector('.demo-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show success message
            const content = overlay.querySelector('.modal-content');
            content.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" style="margin-bottom: 20px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 style="margin-bottom: 8px;">Thank You!</h3>
                    <p style="color: #6B7280;">We've received your request. A member of our team will be in touch within 24 hours.</p>
                </div>
            `;

            setTimeout(closeModal, 3000);
        });

        function closeModal() {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Add hover effects for cards
    const cards = document.querySelectorAll('.problem-card, .step-card, .use-case-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const newIndex = (index + direction + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });

    console.log('BPA 4.0 Landing Page initialized successfully');
});
