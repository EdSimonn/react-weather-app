import React from "react";
import axios from "axios";
import { useState } from "react";
import vbg from "./assets/w-bg.mp4";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a58c25775b6a103cf0e80b6dabebc808
  `;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="overlay"></div>
      <video src={vbg} autoPlay loop muted playsinline />
      <div className="container">
        <div className="content">
          <div className="search">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
          </div>

          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="top">
            <div className="top-mid">
              {data.main ? (
                <img
                  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
              {data.main ? <h1> {data.main.temp.toFixed()}&#176;F</h1> : null}
            </div>

            <div className="desc">
              {data.weather ? <p> {data.weather[0].main} </p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold"> {data.main.feels_like}&#176;F </p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold"> {data.main.humidity}% </p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold"> {data.wind.speed}MPH </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
