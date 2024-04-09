import { useEffect, useState } from "react";
import Select from "react-select";
import { City, Country } from "country-state-city";
import { Card,Metric,Title } from "@tremor/react"

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCity, setSeletedCity] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState([]);

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
    )
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
       const fetchWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity?.values?.latitude}&longitude=${selectedCity?.values?.longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,wind_speed_180m,temperature_180m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,wind_speed_10m_max`)
   }

  
  return (
    <div className="flex max-7xl mx-auto space-x-2  py-10">
      {/* Sidebar */}
      <div className="flex flex-col space-y-3 h-screen bg-blue-950 p-3 w-[20%]">
       {/* Form */}
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
      <div className="w-[75%] h-screen">
        <div className="flex item-center space-x-2">
          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Temperature</Title>
            <Metric>23</Metric>
          </Card>

          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Temperature</Title>
            <Metric>23</Metric>
          </Card>

          <Card decoration="top" decorationColor="green" className="bg-gray-100 text-center">
            <Title>Temperature</Title>
            <Metric>23</Metric>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
