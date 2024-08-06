import React, { useState } from "react";
import axios from "axios";

const CurrentWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "e6b02ca91187029f348bacd150bb2a6a";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Current Weather</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
