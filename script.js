function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

function navigateToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    toggleMobileMenu();
}

function viewResume() {
    window.open('Assest/pdf/Resume.pdf', '_blank');
}
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Assest/pdf/Resume.pdf';
    link.download = 'Kuldeep_Tapodhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'dark');
        toggleTheme();
    } else {
        document.body.removeAttribute('data-theme');
        toggleTheme();
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active') && !navbar.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    window.addEventListener('resize', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    const skillModal = document.getElementById('skill-modal');
    const imageModal = document.getElementById("imageModal");

    if (skillModal) {
        const modalTitle = document.getElementById('modal-skill-title');
        const modalList = document.getElementById('modal-skill-list');
        const closeButton = skillModal.querySelector('.close-button');

        document.querySelectorAll('#skills > div').forEach(category => {
            category.addEventListener('click', () => {
                modalTitle.innerText = category.querySelector('h3').innerText;
                modalList.innerHTML = category.querySelector('ul').innerHTML;
                skillModal.style.display = 'flex';
            });
        });

        if (closeButton) closeButton.addEventListener('click', () => skillModal.style.display = 'none');
    }

    if (imageModal) {
        const modalImg = document.getElementById("modalImage");
        const closeBtn = imageModal.querySelector(".close");

        document.querySelectorAll(".clickable-img").forEach(img => {
            img.onclick = function() {
                imageModal.style.display = "block";
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            }
        });

        if (closeBtn) closeBtn.onclick = () => imageModal.style.display = "none";
    }

    window.addEventListener('click', (event) => {
        if (event.target == skillModal) skillModal.style.display = "none";
        if (event.target == imageModal) imageModal.style.display = "none";
    });

    function setupPaginator(containerSelector, itemSelector, leftBtnId, rightBtnId, itemsPerPage) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const items = container.querySelectorAll(itemSelector);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);

        if (items.length <= itemsPerPage) {
            if (leftBtn) leftBtn.style.display = 'none';
            if (rightBtn) rightBtn.style.display = 'none';
            return;
        }

        let currentPage = 0;
        const totalPages = Math.ceil(items.length / itemsPerPage);

        function showPage(page) {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            items.forEach((item, index) => {
                item.classList.add('paginated-item');
                if (index >= startIndex && index < endIndex) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });
            if (leftBtn) leftBtn.disabled = page === 0;
            if (rightBtn) rightBtn.disabled = page === totalPages - 1;
        }

        if (leftBtn) leftBtn.addEventListener("click", () => {
            if (currentPage > 0) showPage(--currentPage);
        });
        if (rightBtn) rightBtn.addEventListener("click", () => {
            if (currentPage < totalPages - 1) showPage(++currentPage);
        });

        showPage(0);
    }

    setupPaginator('#skills', '#skills > div', 'skills-scroll-left', 'skills-scroll-right', 2);
    setupPaginator('.projects-container', '.project-card', 'projects-scroll-left', 'projects-scroll-right', 2);
    setupPaginator('.card-grid', '.card', 'certs-scroll-left', 'certs-scroll-right', 2);

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' },
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    form.reset();
                } else {
                    alert('Oops! There was a problem with your submission. Please try again.');
                }
            })
            .catch(() => alert('Oops! A network error occurred. Please try again.'))
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});