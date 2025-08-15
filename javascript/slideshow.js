const slideshow = document.querySelector('.slideshow');
const cards = document.querySelectorAll('.slideshow__card');
const dotsContainer = document.querySelector('.slideshow__dots');

let currentIndex = 0;
const totalCards = cards.length;
const angle = 360 / totalCards; // vinklar

// positionera de i en cirkel
cards.forEach((card, index) => {
    const rotation = angle * index;
    card.style.transform = `rotateY(${rotation}deg) translateZ(500px)`; // Place cards in a circle
});

// dots
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slideshow__dot');
    if (index === 0) dot.classList.add('slideshow__dot--active'); // sätt första dot som active 
    dotsContainer.appendChild(dot);

    // Lägg till click event till varje dot
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlideshow();
    });
});

// update the slideshow med funktion
function updateSlideshow() {
    const rotation = -angle * currentIndex; // kalkulera rotation
    slideshow.style.transform = `rotateY(${rotation}deg)`; // rotera

    // Updatera aktiva dot
    const dots = document.querySelectorAll('.slideshow__dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('slideshow__dot--active', index === currentIndex);
    });

    cards.forEach((card, index) => {
        const offset = Math.abs(index - currentIndex);
        if (offset === 0) {
            card.style.transform += ' scale(1.2)'; // lite större
        } else {
            card.style.transform = card.style.transform.replace(' scale(1.2)', ''); // återställ storlek
        }
    });
}

// flytta slideshow varej 6 sekunder
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards; 
    updateSlideshow();
}, 6000); // 6 sekunder

// sätt igång slideshow
updateSlideshow();