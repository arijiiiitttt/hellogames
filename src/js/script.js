document.addEventListener("DOMContentLoaded", () => {
    const logoContainer = document.querySelector(".logo-container");
    const logoList = document.getElementById("logoList");
    const clone = logoList.cloneNode(true);
    logoContainer.appendChild(clone);

    let scrollSpeed = 1; 
    let logoWidth = logoList.offsetWidth;
    let animationRunning = true;

    // Set initial positions
    logoList.style.left = '0px';
    clone.style.left = `${logoWidth}px`;

    function scrollLogos() {
        if (animationRunning) {
            let logoListLeft = parseFloat(getComputedStyle(logoList).left);
            let cloneLeft = parseFloat(getComputedStyle(clone).left);

            logoListLeft -= scrollSpeed;
            cloneLeft -= scrollSpeed;

            logoList.style.left = `${logoListLeft}px`;
            clone.style.left = `${cloneLeft}px`;

            if (logoListLeft <= -logoWidth) {
                logoList.style.left = `${logoWidth}px`;
            }
            if (cloneLeft <= -logoWidth) {
                clone.style.left = `${logoWidth}px`;
            }

            requestAnimationFrame(scrollLogos);
        }
    }

    // Pause/Resume animation on mouse hover
    const allLogos = logoContainer.querySelectorAll("img");
    allLogos.forEach(img => {
        img.addEventListener("mouseover", () => {
            animationRunning = false;
        });
        img.addEventListener("mouseout", () => {
            animationRunning = true;
            scrollLogos();
        });
    });

    scrollLogos();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Game click handler
    const games = document.querySelectorAll('.game');
    games.forEach(game => {
        game.addEventListener('click', () => {
            const gameName = game.querySelector('h3').textContent;
            alert(`Opening ${gameName}...`);
            // Here you can add logic to redirect to specific game pages
        });
    });

    // Clone games for infinite scroll
    const gameContainer = document.querySelector('.game-container');
    const gamesHTML = gameContainer.innerHTML;
    gameContainer.innerHTML = gamesHTML + gamesHTML;
});

// Keep the existing click sound code
const clickSound = document.getElementById("clickSound");

document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        button.addEventListener("click", function() {
            clickSound.play();
        });
    });
});