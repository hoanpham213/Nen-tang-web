// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth + '%';
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.4 });

skillBars.forEach(bar => observer.observe(bar));

// ===== NAVBAR SCROLL SHADOW =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});