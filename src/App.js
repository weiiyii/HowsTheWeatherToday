import React, { useState } from "react";

import "./App.css";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "6cf667eab22d5cab439746670448a690";

const App = () => {
  const [query, setQuery] = useState("");

  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      fetch(`${URL}?q=${query.toLowerCase()}&units=metric&APPID=${API_KEY}`)
        .then((res) => {
          // json format the response
          // console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setWeather(res);
          setQuery("");
        });

      // const data = getWeather(query.toLowerCase());
      // setWeather(data);
      // reset!!!!
      // setQuery("");
      // console.log(data);
    }
  };

  return (
    <div className="main-container">
      <h1>How's The Weather Today</h1>
      <input
        type="text"
        className="search"
        placeholder="Search.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            {/* <sup>{weather.sys.country}</sup> */}
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  ); //
};

export default App;
