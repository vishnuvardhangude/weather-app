import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  // console.log(data);
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
        </div>
        <div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
          <p className="weather-description">{data.weather[0].description}</p>

        </div>
      </div>
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed(2)} m/s</p> : null}
          <p>Wind Speed</p>
        </div>
        <div className="pressure">
          {data.main ? <p className='bold'>{data.main.pressure} hPa</p> : null}
          <p>Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;