import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {


    // 1. Group data by date
    const dailyData = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // get YYYY-MM-DD
        // console.log(date)
        if (!dailyData[date]) 
            dailyData[date] = [];

        dailyData[date].push(item);
    });
    console.log(dailyData);

    // 2. Compute average values and most frequent description for each day
    const forecastArray = Object.keys(dailyData).map(date => {
        const items = dailyData[date];
        const avgFeelsLike = items.reduce((sum, i) => sum + i.main.feels_like, 0) / items.length;
        const avgTempMin = items.reduce((sum, i) => sum + i.main.temp_min, 0) / items.length;
        const avgTempMax = items.reduce((sum, i) => sum + i.main.temp_max, 0) / items.length;
        const avgPressure = items.reduce((sum, i) => sum + i.main.pressure, 0) / items.length;
        const avgHumidity = items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length;
        const avgWind = items.reduce((sum, i) => sum + i.wind.speed, 0) / items.length;
        const avgSeaLevel = items.reduce((sum, i) => sum + (i.main.sea_level || 0), 0) / items.length;

        // Most frequent description
        const descCount = {};
        items.forEach(i => {
            const desc = i.weather[0].description;
            descCount[desc] = (descCount[desc] || 0) + 1;
        });
        const mostFreqDesc = Object.keys(descCount).reduce((a, b) => (descCount[a] > descCount[b] ? a : b));

        // For icon, take the first one (or you could pick most frequent like description)
        const icon = items[0].weather[0].icon;

        return {
            date,
            avgFeelsLike,
            avgTempMin,
            avgTempMax,
            avgPressure,
            avgHumidity,
            avgWind,
            avgSeaLevel,
            description: mostFreqDesc,
            icon
        };
    });


    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    // console.log(groupByDay);

    // console.log(dayInAWeek)
    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                                    <label className="day">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{item.main.pressure}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.main.humidity}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea level:</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{item.main.feels_like}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;