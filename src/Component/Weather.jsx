import React, { useRef, useState } from "react";
import "./Weather.css";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import wind from "../assets/wind.png";
import snow from "../assets/snow.png";
import icons from "../assets/search-icon.png";
import eye from "../assets/eye.png";
import ey from "../assets/ey.png";
import pr from "../assets/pr.png";
import { useEffect } from "react";
const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState("Delhi");
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=267fa5a95fc841f2a2a7722ed1d789e5`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      const description = data.weather[0].description;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: description,
        pressure: data.main.pressure,
        visibility: data.visibility,
      });
    } catch (error) {
      if (!city) {
        alert("Please Enter City name");
      }
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src={icons}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="city">{weatherData.location}</p>
          <p className="description">{weatherData.description}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
                <div className="col">
                  <img src={ey} alt="" />
                </div>
                <div>
                  <p>{weatherData.visibility} meters</p>
                  <span>Visibility</span>
                </div>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
                <div className="col">
                  <img src={pr} alt="" />
                </div>
                  <div>
                    <div>
                      <p> {weatherData.pressure} hPa</p>
                      <span>Pressure</span>
                    </div>
                  </div>
              
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Loading result......</p>
        </>
      )}
    </div>
  );
};

export default Weather;
