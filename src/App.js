import React, { useEffect, useState } from "react";
import Select from "react-select";
import { City, Country } from "country-state-city";
import { Card,Metric,Title } from "@tremor/react"
import AreaChartCard from "./components/AreaChartCard";
import LIneChartCard from "./components/LIneChartCard";

function Navbar({ currentDate }) {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Weather App</h1>
        </div>
        <div>
          <p className="text-sm">Today's Date: {currentDate}</p>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCity, setSeletedCity] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );
    setCurrentDate(new Date().toLocaleDateString());
  }, []);
  
  
  const handleSelectedCountry = (option) => {
   setSelectedCountry (option);
   setSeletedCity(null);
  };

   const handleSelectedCity = (option) => {
    setSeletedCity(option);
   };

   const getWeatherDetails  = async (e) => {
       e.preventDefault();

       // fetching the open api  
       const fetchWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity?.value?.latitude}&longitude=${selectedCity?.value?.longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,wind_speed_180m&timezone=GMT`)

       const data = await fetchWeather.json();

       setWeatherDetails(data);
   };

   console.log(weatherDetails);

  
  return (
    <div>
       <Navbar currentDate={currentDate} />
    <div className="flex max-7xl mx-auto space-x-2  py-10">
      {/* Sidebar */}
      <div className="flex flex-col space-y-3 h-screen bg-blue-950 p-3 w-[18%]">
       {/* Form */}
       <h2 className=" flex text-white font-semibold text-lg">Weather form</h2>
       <Select options={allCountries} value={selectedCountry} onChange={handleSelectedCountry}/>

       <Select options={City.getCitiesOfCountry(selectedCountry?.value?.isoCode).map(
        (city) => ({
          value: {
            latitude: city.latitude,
            longitude: city.longitude,
          },
          label: city.name
        })
       )}
       value={selectedCity}
       onChange={handleSelectedCity}
       />

       <button onClick={getWeatherDetails} className="bg-green-400 w-full py-3 text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out">Get Weather</button>
      
       <div className="flex flex-col space-y-2 text-white font-semibold">
        <p>{selectedCountry?.label} | {selectedCity?.label}</p> 
        <p>Cooridinates: {selectedCity?.value?.latitude} | {" "} {selectedCity?.value?.longitude}</p>
       </div>
       
       <div>
        {/* Sunrise or Sunset */}
       </div>
       
      </div>
      {/* Body */}
      <div className="w-[75%]">
        <div className="flex item-center space-x-2">
          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Temperature</Title>
            <Metric>{weatherDetails?.hourly?.temperature_2m[0]} &#x2103;</Metric>
          </Card>

          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Wind Speed</Title>
            <Metric>{weatherDetails?.hourly?.wind_speed_180m[0]} km/h</Metric>
          </Card>

          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Humid Level</Title>
            <Metric>{weatherDetails?.hourly?.relative_humidity_2m[0]} %</Metric>
          </Card>
        </div>

        <div>
        <AreaChartCard weatherDetails={weatherDetails}/>
        <LIneChartCard weatherDetails={weatherDetails}/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;


