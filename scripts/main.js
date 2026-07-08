// ============================================
// ШАУРМА ПРЕМИУМ — Main JavaScript
// Premium Shawarma Website — All Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 2000);

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'rgba(255, 176, 0, 0.6)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'rgba(255, 176, 0, 0.3)';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ============================================
    // SMOOTH SCROLL & ACTIVE LINK
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // HERO PARTICLES
    // ============================================
    const particlesContainer = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        update();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // AOS-LIKE SCROLL ANIMATIONS
    // ============================================
    const aosElements = document.querySelectorAll('[data-aos]');
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    aosElements.forEach(el => aosObserver.observe(el));

    // ============================================
    // MENU FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            menuCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => card.classList.add('hidden'), 300);
                }
            });
        });
    });

    // ============================================
    // REVIEWS SLIDER
    // ============================================
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewPrev = document.getElementById('reviewPrev');
    const reviewNext = document.getElementById('reviewNext');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = 4;

    const updateSlider = () => {
        const isMobile = window.innerWidth <= 992;
        const slideWidth = isMobile ? 100 : 50;
        reviewsTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    };

    reviewNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    reviewPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
    });

    // Auto-slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);

    // ============================================
    // PROMO TIMER
    // ============================================
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    const updateTimer = () => {
        const now = new Date();
        const diff = endDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerDays.textContent = String(days).padStart(2, '0');
            timerHours.textContent = String(hours).padStart(2, '0');
            timerMinutes.textContent = String(minutes).padStart(2, '0');
            timerSeconds.textContent = String(seconds).padStart(2, '0');
        }
    };
    setInterval(updateTimer, 1000);
    updateTimer();

    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // CART SYSTEM
    // ============================================
    let cart = [];
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    const showToast = (message) => {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    const updateCart = () => {
        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Ваша корзина пуста</p>
                    <span>Добавьте блюда из меню</span>
                </div>
            `;
            cartTotal.textContent = '0 ₽';
        } else {
            let total = 0;
            cartItems.innerHTML = cart.map((item, index) => {
                total += item.price;
                return `
                    <div class="cart-item" style="display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <h4 style="font-size: 1rem; margin-bottom: 4px;">${item.name}</h4>
                            <span style="color: var(--primary); font-weight: 600;">${item.price} ₽</span>
                        </div>
                        <button onclick="removeFromCart(${index})" style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,107,0,0.2); color: var(--primary); display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            }).join('');
            cartTotal.textContent = total + ' ₽';
        }
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    document.querySelectorAll('.btn-add, .menu-add-btn, .dish-quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.dish-card, .menu-card');
            const name = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.dish-price, .menu-price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));

            cart.push({ name, price });
            updateCart();
            showToast(`${name} добавлено в корзину`);
        });
    });

    cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
    cartOverlay.addEventListener('click', () => cartModal.classList.remove('active'));
    cartClose.addEventListener('click', () => cartModal.classList.remove('active'));

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length > 0) {
            showToast('Заказ оформляется...');
            setTimeout(() => {
                cart = [];
                updateCart();
                cartModal.classList.remove('active');
                showToast('Заказ успешно оформлен!');
            }, 1500);
        } else {
            showToast('Корзина пуста');
        }
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // ============================================
    // GALLERY LIGHT EFFECT
    // ============================================
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', x + 'px');
            item.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ============================================
    // RIPPLE EFFECT ON BUTTONS
    // ============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes dynamically
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    document.querySelectorAll('.btn-primary, .btn-add, .menu-add-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ============================================
    // TILT EFFECT ON CARDS
    // ============================================
    document.querySelectorAll('.dish-card, .feature-card, .review-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // TEXT SCRAMBLE EFFECT ON HERO TITLE
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let iteration = 0;

        const scramble = () => {
            heroTitle.innerHTML = originalText.replace(/[A-Za-zА-Яа-я]/g, (letter, index) => {
                if (index < iteration) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            });

            if (iteration < originalText.length) {
                iteration += 1/3;
                requestAnimationFrame(scramble);
            } else {
                heroTitle.innerHTML = originalText;
            }
        };

        setTimeout(scramble, 2500);
    }

    // ============================================
    // SMOOTH REVEAL ON SCROLL
    // ============================================
    const revealElements = document.querySelectorAll('.section-header, .dish-card, .feature-card, .menu-card, .gallery-item, .review-card, .faq-item, .contact-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

    // ============================================
    // HERO IMAGE 3D TILT
    // ============================================
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper) {
        heroImageWrapper.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            heroImageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        heroImageWrapper.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = '';
        });
    }

    // ============================================
    // NAV LINK UNDERLINE ANIMATION
    // ============================================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });

    // ============================================
    // SECTION DIVIDERS ANIMATION
    // ============================================
    const sectionDividers = document.querySelectorAll('.section');
    sectionDividers.forEach((section, index) => {
        if (index < sectionDividers.length - 1) {
            const divider = document.createElement('div');
            divider.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--primary), transparent);
                opacity: 0.3;
            `;
            section.style.position = 'relative';
            section.appendChild(divider);
        }
    });

    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('%c🌯 ШАУРМА ПРЕМИУМ', 'font-size: 24px; font-weight: bold; color: #FFB000;');
    console.log('%cСайт загружен и готов к работе!', 'font-size: 14px; color: #FFD54A;');
    console.log('%cВсе анимации работают на 60 FPS', 'font-size: 12px; color: #FF6B00;');
});
