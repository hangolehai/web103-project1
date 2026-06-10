document.addEventListener('DOMContentLoaded', () => {
    // Extract plant ID from the URL (e.g., /plants/monstera-deliciosa -> monstera-deliciosa)
    const pathParts = window.location.pathname.split('/');
    const plantId = pathParts[pathParts.length - 1];

    const loadingIndicator = document.getElementById('loading-indicator');
    const plantArticle = document.getElementById('plant-article');

    if (!plantId) {
        window.location.href = '/404';
        return;
    }

    // Fetch plant details from API
    fetch(`/api/plants/${plantId}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    window.location.href = '/404'; // Redirect to 404 if not found
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(plant => {
            // Populate the UI with plant data
            document.title = `${plant.name} - Amazing Houseplants`;
            document.getElementById('plant-name').textContent = plant.name;
            document.getElementById('plant-scientific').textContent = plant.scientificName;
            document.getElementById('plant-description').textContent = plant.description;
            document.getElementById('plant-difficulty').textContent = plant.difficulty;
            document.getElementById('plant-light').textContent = plant.lightRequirement;
            document.getElementById('plant-water').textContent = plant.waterRequirement;
            
            const img = document.getElementById('plant-image');
            img.src = plant.image;
            img.alt = plant.name;

            // Hide loading, show article
            loadingIndicator.classList.add('hidden');
            plantArticle.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching plant details:', error);
            loadingIndicator.textContent = 'Failed to load plant details.';
        });
});
