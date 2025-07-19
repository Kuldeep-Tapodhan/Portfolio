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
            
            // Close mobile menu after navigation
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

        // Load saved theme and initialize
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme');
            const sunIcon = document.querySelector('.sun-icon');
            const moonIcon = document.querySelector('.moon-icon');
            
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }

            // Add fade-in animation to elements
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });

            // Add click handlers to desktop nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                });
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Add this to your existing JavaScript
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Assest/pdf/Resume.pdf'; // Replace with your actual resume file path
    link.download = 'Kuldeep_Tapodhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function viewResume() {
    window.open('Assest/pdf/Resume.pdf', '_blank');
}
