document.addEventListener('DOMContentLoaded', () => {
    const plantsGrid = document.getElementById('plants-grid');

    // Fetch plants from the API
    fetch('/api/plants')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(plants => {
            // Clear loading state
            plantsGrid.innerHTML = '';

            // Render each plant as a card
            plants.forEach(plant => {
                const card = document.createElement('article');
                card.className = 'plant-card';
                
                // Add click listener to navigate to detail page
                card.addEventListener('click', () => {
                    window.location.href = `/plants/${plant.id}`;
                });

                // Determine badge class
                let badgeClass = 'difficulty-easy';
                if (plant.difficulty.toLowerCase().includes('medium')) badgeClass = 'difficulty-medium';
                if (plant.difficulty.toLowerCase().includes('hard')) badgeClass = 'difficulty-hard';

                card.innerHTML = `
                    <div class="plant-image-wrapper">
                        <img src="${plant.image}" alt="${plant.name}" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>${plant.name}</h3>
                        <em>${plant.scientificName}</em>
                        <p>${plant.description.substring(0, 100)}...</p>
                        <div>
                            <span class="difficulty-badge ${badgeClass}">${plant.difficulty}</span>
                        </div>
                    </div>
                `;
                
                plantsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching plants:', error);
            plantsGrid.innerHTML = `<p class="error">Failed to load plants. Please try again later.</p>`;
        });
});
