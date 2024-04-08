import { useEffect, useState } from "react";
import Select from "react-select";
import { City, Country } from "country-state-city";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCity, setSeletedCity] = useState([]);

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

  
  return (
    <div>
      {/* Sidebar */}
      <div className="flex flex-col space-y-3">
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

       <button className="bg-green-400 w-full py-3 text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out">Get Weather</button>
       <div>
        
       </div>
      </div>
      {/* Body */}
      <div></div>
    </div>
  );
}

export default App;
