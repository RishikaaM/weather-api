// script.js
document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const body = document.body;

    // Clear previous results
    resultDiv.innerHTML = '';
    
    // Validate input
    if (!city) {
        resultDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    // Show loading indicator
    loadingDiv.hidden = false;

    try {
        const response = await fetch(`http://localhost:3001/weather?city=${city}`);
        loadingDiv.hidden = true; // Hide loading indicator after fetch

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Error: ${response.status} - ${errorBody.message}`);
        }

        const data = await response.json();

        // Display the weather data
        resultDiv.innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p><strong>Temperature:</strong> ${(data.main.temp - 273.15).toFixed(2)} °C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;

        // Change background based on weather conditions
        const weatherCondition = data.weather[0].main.toLowerCase();
        body.className = ''; // Reset classes
        if (weatherCondition.includes('clear') || weatherCondition.includes('sunny')) {
            body.classList.add('sunny');
        } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
            body.classList.add('rainy');
        } else if (weatherCondition.includes('cloud')) {
            body.classList.add('cloudy');
        } else {
            body.classList.add('sunny'); // Default to sunny if condition is unknown
        }

    } catch (error) {
        console.error('Error:', error);
        loadingDiv.hidden = true; // Hide loading indicator on error
        resultDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
});
