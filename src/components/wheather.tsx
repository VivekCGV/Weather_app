import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import { RiLoaderFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import "./wheather.css";
import Thunder from "../assets/images/thunderstorm.svg";
import Rain from "../assets/images/rain.svg";
import Drizzle from "../assets/images/drizzle.svg";
import Cloud from "../assets/images/brkclouds.svg";
import Snow from "../assets/images/snow.svg";
import clear from "../assets/images/clear.svg";
import Atmosphere from "../assets/images/atmosphere.svg";
import Htemp from "../assets/images/h-temp.svg";
import Ctemp from "../assets/images/c-temp.svg";
import cloudpng from "../assets/images/cloud.png";
import errorImg from "../assets/images/error.png";

interface weather {
  name: string;
  weather: {
    main: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  main: {
    humidity: number;
    temp: number;
    feels_like: number;
  };
}

const wheather = () => {
  const [city, setCity] = useState("");
  const [value, setValue] = useState<weather>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<boolean>(true);

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const Sub = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    setDone(true);
    axios
      .get(map2)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        // alert(response.data.weather[0].main);
        setError(true);
        setValue(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        // alert("Please Enter Valid Location Name" + error);
        setError(false);
        // console.log("Error fetching data ");
      })
      .finally(function () {
        // always executed
        setDone(false);
      });
  };

  let map2: string = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=057c0ccc5b061da3aaa748fdb6c23de1&units=metric`;

  const weatherChanger = (wheather: string) => {
    let iconElement: React.ReactNode;

    switch (wheather) {
      case "Thunderstorm":
        iconElement = <img src={Thunder} alt="React Logo" />;
        break;

      case "Clouds":
        iconElement = <img src={Cloud} alt="React Logo" />;
        break;

      case "Clear":
        iconElement = <img src={clear} alt="React Logo" />;
        break;

      case "Snow":
        iconElement = <img src={Snow} alt="React Logo" />;
        break;

      case "Rain":
        iconElement = <img src={Rain} alt="React Logo" />;
        break;

      case "Drizzle":
        iconElement = <img src={Drizzle} alt="React Logo" />;
        break;

      default:
        iconElement = <img src={Atmosphere} alt="React Logo" />;
    }

    return iconElement;
  };

  const tempLevel = (temp: number) => {
    let tempElement: React.ReactNode;
    if (temp <= 26) {
      tempElement = <img src={Ctemp} alt="" />;
    } else {
      tempElement = <img src={Htemp} alt="" />;
    }
    return tempElement;
  };

  return (
    <>
      <div className="App">
        <div className="heading">
          <h1>
            Weather<span> Forecast</span>
          </h1>
        </div>
        <div className="search">
          <form action="" onSubmit={(e) => Sub(e)} className="searchForm">
            <input
              type="text"
              placeholder="Search here"
              ref={inputRef}
              value={city}
              onChange={(e) => changeName(e)}
            />
            <button>
              <FcSearch className="searchIcon" />
            </button>
          </form>
        </div>
        {done ? (
          <>
            <div className="loading">
              <RiLoaderFill className="loaderIcon" />
              <p className="loaderPara">Loading...</p>
            </div>
          </>
        ) : error ? (
          value ? (
            <>
              <div className="weatherInfo">
                <h1>{value.name}</h1>
                <div className="iconDiv">
                  {weatherChanger(value.weather[0].main)}
                </div>
                <h2>{value.weather[0].main}</h2>
                <div className="tempInfo">
                  <div>
                    <p className="tempPara1">
                      Temp : {value.main.temp.toFixed(1)}&deg;c
                    </p>
                    <p>Feels like : {value.main.feels_like.toFixed(1)}&deg;c</p>
                  </div>
                  <div className="tempIcon">{tempLevel(value.main.temp)}</div>
                </div>
                <div className="detail">
                  <div className="humidity">
                    <WiHumidity className="humidIcon" />
                    <div className="humidInfo">
                      <h2>{value.main.humidity}%</h2>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="wind">
                    <SiWindicss className="windIcon" />
                    <div className="humidInfo">
                      <h2>{value.wind.speed}Km/h</h2>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="cloudCont">
                <img src={cloudpng} alt="" />
              </div>
              <p className="initialPara">Enter the location</p>
            </>
          )
        ) : (
          <div className="errorCont">
            <img src={errorImg} alt="error image" />
            <p>Please enter the valid city name !</p>
          </div>
        )}
      </div>
    </>
  );
};

export default wheather;
