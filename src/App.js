import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './App.css';

const API_KEY = 'fcf31da4ff2e64929b6de913e1e8d6a5';

function App() {
 const [city, setCity] = useState('Toronto');         // input value
 const [queryCity, setQueryCity] = useState('Toronto'); // city we actually fetch
 const [weather, setWeather] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 // Fetch weather when queryCity changes
 useEffect(() => {
   async function fetchWeather() {
     try {
       setLoading(true);
       setError('');
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric`;
       const res = await fetch(url);

       if (!res.ok) {
         throw new Error('City not found');
       }

       const data = await res.json();

       const iconCode = data.weather[0].icon;
       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

       setWeather({
         city: `${data.name}, ${data.sys.country}`,
         temp: Math.round(data.main.temp),
         description: data.weather[0].description,
         iconUrl,
       });
     } catch (err) {
       setError(err.message);
       setWeather(null);
     } finally {
       setLoading(false);
     }
   }

   fetchWeather();
 }, [queryCity]);

 const handleSubmit = (e) => {
   e.preventDefault();
   if (city.trim() === '') return;
   setQueryCity(city.trim());
 };

 return (
   <div className="app">
     <h1>Tyson's Weather App</h1>

     <form onSubmit={handleSubmit} className="search-form">
       <input
         type="text"
         value={city}
         onChange={(e) => setCity(e.target.value)}
         placeholder="Enter city name (e.g., Toronto)"
       />
       <button type="submit">Search</button>
     </form>

     {loading && <p>Loading...</p>}
     {error && <p className="error">{error}</p>}

     <WeatherCard
       city={weather?.city}
       temp={weather?.temp}
       description={weather?.description}
       iconUrl={weather?.iconUrl}
     />
   </div>
 );
}

export default App;