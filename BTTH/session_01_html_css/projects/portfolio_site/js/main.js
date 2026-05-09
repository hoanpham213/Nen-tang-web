// Animate skill bars khi scroll vào viewport
const progressBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth + '%';
            bar.classList.add('animate');
            observer.unobserve(bar); // chỉ chạy 1 lần
        }
    });
}, { threshold: 0.3 });

progressBars.forEach(bar => observer.observe(bar));