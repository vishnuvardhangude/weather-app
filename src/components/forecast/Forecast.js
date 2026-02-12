import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {


    // 1. Group data by date
    const dailyData = {};

    data.list.forEach(item => {

        // console.log(item.dt_txt)
        const date = item.dt_txt.split(' ')[0]; // get YYYY-MM-DD
        // console.log(date)
        if (!dailyData[date]) 
            dailyData[date] = [];

        dailyData[date].push(item);
    });
    console.log(dailyData);

    // 2. Compute average values and most frequent description for each day
    const round2 = (num) => Number(num.toFixed(2));
    const round = (num) => Number(Math.round(num));

    const forecastArray = Object.keys(dailyData).map(date => {
        const items = dailyData[date];
    
        const avgFeelsLike = round(items.reduce((sum, i) => sum + i.main.feels_like, 0) / items.length);
        const avgTemp = round(items.reduce((sum, i) => sum + i.main.temp, 0) / items.length);
        const avgPressure = round(items.reduce((sum, i) => sum + i.main.pressure, 0) / items.length);
        const avgHumidity = round(items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length);
        const avgWind = round2(items.reduce((sum, i) => sum + i.wind.speed, 0) / items.length);
        const avgSeaLevel = round(items.reduce((sum, i) => sum + (i.main.sea_level || 0), 0) / items.length);
        const avgClouds = round(items.reduce((sum, i) => sum + (i.clouds.all || 0), 0) / items.length);

        // Most frequent description
        const descCount = {};
        const iconCount = {};
        console.log("start");
        items.forEach(i => {
            // console.log(date, desc)
            const desc = i.weather[0].description;
            descCount[desc] = (descCount[desc] || 0) + 1;

            const icon = i.weather[0].icon;
            iconCount[icon] = (iconCount[icon]|| 0) +1;
            console.log(i.dt_txt, desc, icon);
            // console.log(i.dt_txt);
            
        });
        
        const mostFreqDesc = Object.keys(descCount).reduce((a, b) => (descCount[a] > descCount[b] ? a : b));
        const mostFreqIcon = Object.keys(iconCount).reduce((a, b) => (iconCount[a] > iconCount[b] ? a : b));
        console.log(mostFreqDesc, mostFreqIcon);

        const dayIndex = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
        const day = WEEK_DAYS[dayIndex]; // Adjust for Monday-first array

        // console.log(date, day)
        return {
            date,
            day,
            avgFeelsLike,
            avgTemp,
            avgPressure,
            avgHumidity,
            avgWind,
            avgSeaLevel,
            description: mostFreqDesc,
            icon: mostFreqIcon,
            avgClouds,
        };
    });

    return (
        <>
            <label className="title">Daily Average</label>
            <Accordion allowZeroExpanded>
                {forecastArray.map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img src={`icons/${item.icon}.png`} className="icon-small" alt="weather" />
                                    <label className="day">{item.day}</label>
                                    <label className="description">{item.description}</label>
                                    <label className="min-max">{Math.round(item.avgTemp)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{item.avgPressure}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.avgHumidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{item.avgClouds}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.avgWind} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea level:</label>
                                    <label>{item.avgSeaLevel}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{item.avgFeelsLike}°C</label>
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