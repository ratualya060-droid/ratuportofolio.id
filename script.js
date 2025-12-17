// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer untuk animasi section
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animasi skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animasi skill bars
let skillsAnimated = false;
function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.getAttribute('data-width');
            fill.style.setProperty('--skill-width', width + '%');
            fill.classList.add('animate');
        }, index * 100);
    });
}

// Header scrolling effect
const header = document.getElementById('mainHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Tombol scroll to top dan WhatsApp mengambang
const scrollTopBtn = document.getElementById('scrollTopBtn');
const whatsappBtn = document.getElementById('whatsappBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
        whatsappBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
        whatsappBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form kontak - kirim ke WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (message.length < 10) {
        alert('Pesan terlalu pendek! Minimal 10 karakter.');
        return;
    }

    // Format pesan untuk WhatsApp
    const whatsappMessage = `Halo, saya ${name}%0A%0A${encodeURIComponent(message)}`;
    const whatsappURL = `https://wa.me/6289560456752?text=${whatsappMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Project hover effect
const projects = document.querySelectorAll('.project');
projects.forEach(project => {
    project.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1.02)';
        }, 200);
    });
});

// Easter egg - triple click pada header
let clickCount = 0;
let clickTimer;
header.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    
    if (clickCount === 3) {
        alert('🎉 Kamu menemukan easter egg! Terima kasih sudah mengunjungi portofolio saya! 🌸');
        clickCount = 0;
    }
    
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 500);
});