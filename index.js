// index.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to enable CORS
app.use(cors({
    origin: '*'
}));

app.use(express.json()) // enables the Express application to parse incoming JSON data from the request body. without this, the req.body object will be undefined
app.use(express.static('website')) 

// Root endpoint
// app.get('/', (req, res) => {
//     res.send('Welcome to the API!');
// });

// Weather endpoint that uses the OpenWeatherMap API
app.get('/weather', async (req, res) => {
    const apiKey = process.env.API_KEY; // Get the API key from environment variables
    const city = req.query.city || 'London'; // Use a query parameter for city, default to London

    try {
        // Fetch weather data from OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            const errorBody = await response.json(); // Capture the error response body
            throw new Error(`Error: ${response.status} - ${JSON.stringify(errorBody)}`); // Include more details in the error
        }
        
        const data = await response.json(); // Parse the JSON response
        res.json(data); // Send the data as a JSON response
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log detailed error
        res.status(500).json({ message: 'Failed to fetch data', error: error.message }); // Return detailed error message
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the server status
});
