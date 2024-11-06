# Weather API

## Description
This API provides weather data for cities using the OpenWeatherMap API.

## API URL
`http://localhost:3001/weather?city={city}`

## How to Request
To get weather data for a specific city, make a GET request to the API URL, replacing `{city}` with the desired city name.

### Sample Request
```bash
curl "http://localhost:3001/weather?city=London"
