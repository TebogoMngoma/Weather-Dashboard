import React from 'react';

const Forecast = ({ data }) => {
    if (!data) return null;

    // Filter to get one forecast per day (OpenWeather provides every 3 hours)
    const dailyForecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    return (
        <div className="forecast-container">
            <h3>5-Day Forecast</h3>
            <div className="forecast-list">
                {dailyForecast.map((item, index) => (
                    <div key={index} className="forecast-item">
                        <span className="day">
                            {new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
                        </span>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                        />
                        <span className="temp">{Math.round(item.main.temp)}°C</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
