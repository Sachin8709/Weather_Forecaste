import styled from 'styled-components';

export const WeatherContainer = styled.div`
  padding: 20px;
  background-color: #A9A9A9;
  color: #333;
`;

export const WeatherText = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const LoadingText = styled.p`
  font-style: italic;
  color: #888;
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

export const WeatherInfoContainer = styled.div`
  margin-top: 20px;
`;

export const WeatherInfoItem = styled.div`
  margin-bottom: 10px;
`;

export const WeatherLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const WeatherValue = styled.span`
  font-weight: normal;
`;

export const WeatherBackground = styled.div<{ weatherCondition?: string }>`
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  text-align: center;

  ${({ weatherCondition }) => {
    switch (weatherCondition?.toLowerCase()) {
      case 'clear':
        return `
          background-color: #00bcd4; /* Clear sky color */
          background-image: url("https://www.example.com/clear-sky-bg.jpg"); /* Add appropriate weather icon */
        `;
      case 'clouds':
        return `
          background-color: #90a4ae; /* Cloudy color */
          background-image: url("clear.jpg");
        `;
      case 'rain':
        return `
          background-color: #1565c0; /* Rainy color */
          background-image: url("https://www.example.com/rainy-bg.jpg");
        `;
      default:
        return `
          background-color: #ffc107; /* Default sunny color */
          background-image: url("sunny.jpg");
        `;
    }
  }}
`;
