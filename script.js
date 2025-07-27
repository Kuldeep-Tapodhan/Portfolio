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

document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('#skills > div');
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-skill-title');
    const modalList = document.getElementById('modal-skill-list');
    const closeButton = document.querySelector('.close-button');

    function openModal(category) {
        const title = category.querySelector('h3').innerText;
        const skillsHTML = category.querySelector('ul').innerHTML;

        modalTitle.innerText = title;
        modalList.innerHTML = skillsHTML;

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            openModal(category);
        });
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
 


const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const images = document.querySelectorAll(".clickable-img");
const closeBtn = document.querySelector(".close");


images.forEach(img => {
  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    modalImg.alt = this.alt; 
}
});

closeBtn.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



document.addEventListener("DOMContentLoaded", () => {
    function setupPaginator(containerSelector, itemSelector, leftBtnId, rightBtnId, itemsPerPage) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const items = container.querySelectorAll(itemSelector);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);
        
        if (items.length <= itemsPerPage) {
            if(leftBtn) leftBtn.style.display = 'none';
            if(rightBtn) rightBtn.style.display = 'none';
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

        if (leftBtn) {
            leftBtn.addEventListener("click", () => {
                if (currentPage > 0) {
                    currentPage--;
                    showPage(currentPage);
                }
            });
        }
        
        if (rightBtn) {
            rightBtn.addEventListener("click", () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    showPage(currentPage);
                }
            });
        }

        showPage(0);
    }

    setupPaginator('#skills', '#skills > div', 'skills-scroll-left', 'skills-scroll-right', 2);
    setupPaginator('.projects-container', '.project-card', 'projects-scroll-left', 'projects-scroll-right', 2);
    setupPaginator('.card-grid', '.card', 'certs-scroll-left', 'certs-scroll-right', 2);
});