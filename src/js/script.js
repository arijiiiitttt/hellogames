document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right');
    
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navRight.classList.toggle('active');
        
        // Animate hamburger to X
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navRight.contains(e.target)) {
            navRight.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link, .contact-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navRight.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Pause carousel on hover
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }

    // Touch support for carousel pausing
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('touchend', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    
    // Clone all items and append to track
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
});