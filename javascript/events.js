document.addEventListener('DOMContentLoaded', () => {
    const raceList = document.getElementById('race-list');

    // Fetch the JSON data
    fetch('./events.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((country, index) => {
                // Create a container for each country
                const countryContainer = document.createElement('div');
                countryContainer.classList.add('country-container');
                countryContainer.style.setProperty('--index', index); // Set the custom property for stacking

                // Add the country title with a unique class
                const countryTitle = document.createElement('h3');
                countryTitle.classList.add('country-title'); // UNIQUE CLASS HERE
                countryTitle.textContent = country.country;
                countryContainer.appendChild(countryTitle);

                const countryName = country.country;
                const imagePath = `Extras/Pictures/Flags/${countryName}Banner.webp`;
                console.log('Image path:', imagePath);
                countryContainer.style.backgroundImage = `url(${imagePath})`;

                // Create a container for the race cards
                const raceCardsContainer = document.createElement('div');
                raceCardsContainer.classList.add('race-cards');
                raceCardsContainer.style.display = 'none'; // Start with the cards hidden

                // Add race cards to the raceCardsContainer
                country.races.forEach(race => {
                    const raceCard = document.createElement('div');
                    raceCard.classList.add('race-card');

                    // Format the date
                    const formattedDate = new Date(race.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    raceCard.innerHTML = `
                        <h3>${race.city}</h3>
                        <p><strong>Date:</strong> ${formattedDate}</p>
                        <p><strong>Time:</strong> ${race.time}</p>
                        <p><strong>Place:</strong> ${race.place}</p>
                        <p>${race.description}</p>
                    `;

                    raceCardsContainer.appendChild(raceCard);
                });

                // Append the raceCardsContainer to the country container
                countryContainer.appendChild(raceCardsContainer);

                // Add click event to toggle visibility of race cards
                countryContainer.addEventListener('click', () => {
                    const isVisible = raceCardsContainer.style.display === 'flex';
                    raceCardsContainer.style.display = isVisible ? 'none' : 'flex'; // Toggle visibility
                });

                // Append the country container to the race list
                raceList.appendChild(countryContainer);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

