class ScrollEffects {
    constructor() {
        this.text = document.getElementById('text');
        this.movingCar = document.querySelector('.loading__image'); 
        this.maxScrollValue = 1500;
        this.activationScroll = 1150; 
        this.maxCarScroll = 2000; 
        this.setScrollValuesByScreenSize();
        this.init();
        
        window.addEventListener('resize', () => this.setScrollValuesByScreenSize());
    }

    setScrollValuesByScreenSize() {
        const width = window.innerWidth;

        if (width >= 1600) {
            // very big screens 
            this.activationScroll = 1700;  
            this.maxCarScroll = 2700;     

        }
        else if (width >= 1400 && width <= 1599) {
            // bigger screen 
            this.activationScroll = 1500;  
            this.maxCarScroll = 2500;     

        } else if (width >= 1200 && width <= 1399) {
            // big screen 
            this.activationScroll = 1050;
            this.maxCarScroll = 2000;

        } else if (width >= 992 && width < 1200) {
            // Mellersta skärmar
            this.activationScroll = 900; 
            this.maxCarScroll = 1900;

        } else if (width >= 768 && width < 992) {
            //small to big screens 
            this.activationScroll = 800; 
            this.maxCarScroll = 1800;

        } else if (width >= 481 && width < 768) {
            // small screens
            this.activationScroll = 500; 
            this.maxCarScroll = 1500;

        } else if (width <= 480) {
            // very small screens 
            this.activationScroll = 300;  
            this.maxCarScroll = 1200;   
        }
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // move the text vertically based on scroll
        if (this.text && scrollY <= this.maxScrollValue) {
            this.text.style.marginTop = scrollY * 1.3 + 'px';
        }

        // car movement 
        if (this.movingCar) {
            this.handleCarMovement(scrollY);
        }
    }

   
handleCarMovement(scrollY) {
    if (scrollY >= this.activationScroll && scrollY <= this.maxCarScroll) {
        const progress = (scrollY - this.activationScroll) / (this.maxCarScroll - this.activationScroll);

        // Get car width (default to 0 if not loaded)
        const carWidth = this.movingCar ? this.movingCar.offsetWidth : 0;
        // Calculate max X so car stays within viewport
        const maxX = window.innerWidth - carWidth;

        // Calculate position, clamp to maxX
        const carXPosition = Math.min(progress * maxX, maxX);

        this.movingCar.style.transform = `translateX(${carXPosition}px)`;
        this.movingCar.style.display = 'block';
    } else {
        this.movingCar.style.display = 'none';
    }}}


document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
});
