import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    // console.log("test")
    // console.log(searchData)
    const [lat, lon] = searchData.value.split(" ");

    // console.log(lat, lon)

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // console.log(currentWeatherFetch)
    // console.log(forecastFetch)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });

        // console.log(currentWeather);
        // console.log(forecast);

      })
      .catch(console.log);


  }

  return (
    <div className='app'>
      <div className='search'>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      <div className="container">
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
        
      </div>
    </div>
  );
}

export default App;
