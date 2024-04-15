import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList';
import { WeatherContainer, WeatherText, LoadingText, ErrorText, WeatherInfoContainer, WeatherInfoItem, WeatherLabel, WeatherValue, WeatherBackground } from './WeatherPage.styles';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

const WeatherPage: React.FC<any> = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unit, setUnit] = useState('metric'); // Default to metric (Celsius)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = 'cf635091675d01b56b318f3656fa527b';
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

          try {
            const response = await axios.get(url);
            const { main, weather, wind } = response.data;
            setWeatherData({
              temperature: main.temp,
              description: weather[0].description,
              humidity: main.humidity,
              windSpeed: wind.speed,
              pressure: main.pressure,
            });
            setLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setErrorMessage('Error fetching weather data. Please try again later.');
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setErrorMessage('Error getting geolocation. Please enable it in your browser settings.');
          setLoading(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, [unit]);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  return (
    <WeatherContainer>
      <FavoritesList />
      <WeatherText>Current Weather</WeatherText>
      {loading ? (
        <LoadingText>Loading weather data...</LoadingText>
      ) : errorMessage ? (
        <ErrorText>{errorMessage}</ErrorText>
      ) : weatherData ? (
        <WeatherInfoContainer>
          <WeatherInfoItem>
            <WeatherLabel>Temperature:</WeatherLabel>
            <WeatherValue>{unit === 'metric' ? weatherData.temperature + '°C' : weatherData.temperature + '°F'}</WeatherValue>
          </WeatherInfoItem>
          <WeatherInfoItem>
            <WeatherLabel>Description:</WeatherLabel>
            <WeatherValue>{weatherData.description}</WeatherValue>
          </WeatherInfoItem>
          <WeatherInfoItem>
            <WeatherLabel>Humidity:</WeatherLabel>
            <WeatherValue>{weatherData.humidity}%</WeatherValue>
          </WeatherInfoItem>
          <WeatherInfoItem>
            <WeatherLabel>Wind Speed:</WeatherLabel>
            <WeatherValue>{weatherData.windSpeed} km/h</WeatherValue>
          </WeatherInfoItem>
          <WeatherInfoItem>
            <WeatherLabel>Pressure:</WeatherLabel>
            <WeatherValue>{weatherData.pressure} hPa</WeatherValue>
          </WeatherInfoItem>
        </WeatherInfoContainer>
      ) : null}
      <h3>Unit of Measurement</h3>
      <select value={unit} onChange={handleUnitChange}>
        <option value="metric">Celsius (Metric)</option>
        <option value="imperial">Fahrenheit (Imperial)</option>
      </select>
      <WeatherBackground weatherCondition={weatherData ? weatherData.description : ''}>
        {weatherData ? weatherData.description : ''}
      </WeatherBackground>
    </WeatherContainer>
  );
};

export default WeatherPage;
