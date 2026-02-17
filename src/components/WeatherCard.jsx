import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2>{name}</h2>
                <p>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="weather-main">
                <img src={iconUrl} alt={weather[0].description} />
                <div className="temp-container">
                    <span className="temperature">{Math.round(main.temp)}°C</span>
                    <span className="description">{weather[0].description}</span>
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <Thermometer size={20} />
                    <span>Feels like: {Math.round(main.feels_like)}°C</span>
                </div>
                <div className="detail-item">
                    <Droplets size={20} />
                    <span>Humidity: {main.humidity}%</span>
                </div>
                <div className="detail-item">
                    <Wind size={20} />
                    <span>Wind: {wind.speed} m/s</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
