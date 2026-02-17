import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import weatherService from './services/weatherService';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await weatherService.getCurrentWeather(city);
      const forecast = await weatherService.getForecast(city);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found or API error');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial search
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main>
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <div className="dashboard-content">
            <WeatherCard data={weatherData} />
            <Forecast data={forecastData} />
          </div>
        )}
      </main>

      <footer>
        <p>Data provided by OpenWeather API</p>
      </footer>
    </div>
  );
}

export default App;
