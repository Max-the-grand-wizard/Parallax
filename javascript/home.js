class ScrollEffects {
    constructor() {
        this.text = document.getElementById('text');
        this.movingCar = document.querySelector('.loading__image'); // Uppdatera vid behov
        this.maxScrollValue = 1500;
        this.activationScroll = 1150; // Ursprungligt värde för större skärmar
        this.maxCarScroll = 2000; // Ursprungligt värde för större skärmar
        this.setScrollValuesByScreenSize(); // Sätt upp värden baserat på skärmstorlek
        this.init();
        
        // Lyssnar på fönsterändringar för att justera scroll-värden vid storleksändring
        window.addEventListener('resize', () => this.setScrollValuesByScreenSize());
    }

    // Justera scroll-värden baserat på skärmstorlek
    setScrollValuesByScreenSize() {
        const width = window.innerWidth;

        if (width >= 1600) {
            // För väldigt stora skärmar, öka activationScroll för att fördröja aktiveringen
            this.activationScroll = 1700;  // Starta effekten senare
            this.maxCarScroll = 2700;     // Större område för rörelse

        }
        else if (width >= 1400 && width <= 1599) {
            // För väldigt stora skärmar, öka activationScroll för att fördröja aktiveringen
            this.activationScroll = 1500;  // Starta effekten senare
            this.maxCarScroll = 2500;     // Större område för rörelse

        } else if (width >= 1200 && width <= 1399) {
            // Större skärm, lite högre värden
            this.activationScroll = 1050;
            this.maxCarScroll = 2000;

        } else if (width >= 992 && width < 1200) {
            // Mellersta skärmar
            this.activationScroll = 900; // Justera nedåt för att aktivera tidigare
            this.maxCarScroll = 1900;

        } else if (width >= 768 && width < 992) {
            // Små till mellanstora skärmar
            this.activationScroll = 800; // Fortfarande tidigare aktivering
            this.maxCarScroll = 1800;

        } else if (width >= 481 && width < 768) {
            // Väldigt små skärmar
            this.activationScroll = 500; // Ytterligare nedjustering
            this.maxCarScroll = 1500;

        } else if (width <= 480) {
            // Extra små enheter, mobil
            this.activationScroll = 300;  // Mycket tidigare start
            this.maxCarScroll = 1200;    // Kortare rörelse
        }
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // Flytta texten vertikalt baserat på scroll
        if (this.text && scrollY <= this.maxScrollValue) {
            this.text.style.marginTop = scrollY * 1.3 + 'px';
        }

        // Hantera bilens rörelse
        if (this.movingCar) {
            this.handleCarMovement(scrollY);
        }
    }

    handleCarMovement(scrollY) {
        if (scrollY >= this.activationScroll && scrollY <= this.maxCarScroll) {
            const progress = (scrollY - this.activationScroll) / (this.maxCarScroll - this.activationScroll);
            
            // Justera bilens rörelse baserat på skärmstorleken
            const carXPosition = progress * window.innerWidth; 

            // Förhindra att bilen rör sig för mycket på mindre skärmar
            this.movingCar.style.transform = `translateX(${Math.min(carXPosition, window.innerWidth)}px)`; 
            this.movingCar.style.display = 'block';
        } else {
            this.movingCar.style.display = 'none';
        }
    }
}

// Initiera när sidan är laddad
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
});
