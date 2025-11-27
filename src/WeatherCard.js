import React from 'react';

function WeatherCard({ city, temp, description, iconUrl }) {
 if (!city) return null;

 return (
   <div className="weather-card">
     <h2>{city}</h2>
     {iconUrl && <img src={iconUrl} alt={description} />}
     <p>{temp} °C</p>
     <p>{description}</p>
   </div>
 );
}

export default WeatherCard;