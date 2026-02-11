import React from 'react'
import "./current-weather.css"

const CurrentWeather = () => {
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">Singapore</p>
                    <p className="desc">Sunny</p>
                </div>
                <img alt="weather" className="weather-icon" src="/icons/01d.png" />

            </div>

        </div>
    )
}

export default CurrentWeather;
