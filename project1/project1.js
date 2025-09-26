document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('a.nav-link');
    const sections = [...document.querySelectorAll('section, #hero')];

    function onScroll() {
        const scrollPos = window.scrollY + 100;
        let current = sections[0];

        for (const section of sections) {
            if (section.offsetTop <= scrollPos) {
                current = section;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current.id) {
                link.classList.add('active');
            }    
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');

            let valid = true;

            if (!name.value.trim()) {
                valid = false;
                alert('Please enter your name.');
            }
            if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
                valid = false;
                alert('Please enter a valid email.');
            }
            if (!message.value.trim() || message.value.length < 10) {
                valid = false;
                alert('Please enter a message at least 10 characters long.');
            }

            if (valid) {
                contactForm.submit();
            }
        });
    }
});

const galleryModal = document.getElementById('galleryModal');
const galleryModalImg = document.getElementById('galleryModalImg');
galleryModal.addEventListener('show.bs.modal', event => {
const img = event.relatedTarget;
galleryModalImg.src = img.getAttribute('data-bs-img');
galleryModalImg.alt = img.alt;
});