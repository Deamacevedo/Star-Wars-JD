
// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    setupIntroAnimation();
    setupScrollIndicator();
    createStars();
    document.getElementById('continue-btn').addEventListener('click', startApplication);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            setCategory(this.dataset.category);
        });
    });

    document.getElementById('searchInput').addEventListener('input', searchItems);
});

function setupScrollIndicator() {
    // Ocultar el indicador cuando se hace scroll
    window.addEventListener('scroll', function () {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });

    // También ocultar cuando se detecta cualquier movimiento de scroll
    window.addEventListener('wheel', function () {
        if (!hasScrolled) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });

    // Para dispositivos táctiles
    window.addEventListener('touchstart', function () {
        if (!hasScrolled) {
            hasScrolled = true;
            const indicator = document.getElementById('scroll-indicator');
            indicator.classList.add('hidden');
        }
    });
}

function setupIntroAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "body",
        start: "50% top",
        end: "bottom bottom",
        onEnter: showContinueButton,
        onEnterBack: showContinueButton,
    });

    gsap.timeline({
        scrollTrigger: {
            scrub: 1,
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
        }
    })
        .to("#hero-key", { duration: 1, scale: 1 })
        .to("#logo-mask", { maskSize: "clamp(50vh, 25%, 30vh)" }, 0.15)
        .to("#hero-key", { opacity: 0, duration: 0.3 }, 0.4);
}

function showContinueButton() {
    const btn = document.getElementById('continue-btn');
    btn.classList.remove('hidden');
    btn.classList.add('show');
}

function startApplication() {
    document.getElementById('logo-mask').style.display = 'none';
    document.getElementById('continue-btn').style.display = 'none';
    document.getElementById('scroll-indicator').style.display = 'none';

    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    const appContainer = document.getElementById('appContainer');
    appContainer.style.display = 'block';
    // Agregar clase para activar la nueva animación de estrellas
    appContainer.classList.add('active');
    gsap.from(appContainer, { opacity: 0, y: 50, duration: 1 });

    window.scrollTo(0, 0);
    loadData(currentCategory);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}
