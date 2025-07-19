// Load saved theme and initialize
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Default to dark theme if the saved theme is not 'light'
    if (savedTheme === 'light') {
        body.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        body.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        // Optional: save 'dark' as default on first visit
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Add click handlers to desktop nav links for smooth scrolling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Theme toggle functionality
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

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Navigate to section and close mobile menu
function navigateToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbar = document.querySelector('.navbar');

    if (!navbar.contains(event.target) && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Handle window resize to hide mobile menu on larger screens
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Function to view resume in a new tab
function viewResume() {
    window.open('Assest/pdf/Resume.pdf', '_blank');
}

// Function to download resume
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Assest/pdf/Resume.pdf';
    link.download = 'Kuldeep_Tapodhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}