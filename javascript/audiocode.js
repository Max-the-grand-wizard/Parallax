const imageWrapper = document.querySelector('.animated-section__image-wrapper');
const audio = document.querySelector('.animated-section__audio');
const animatedSection = document.querySelector('.animated-section');

imageWrapper.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        animatedSection.classList.add('animated-section--playing');
        animatedSection.classList.remove('animated-section--paused');
    } else {
        audio.pause();
        animatedSection.classList.remove('animated-section--playing');
        animatedSection.classList.add('animated-section--paused');
    }
});
