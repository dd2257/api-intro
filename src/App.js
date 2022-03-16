import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cities, setCities] = useState(null);
  const [singleCity, setSingleCity] = useState("");
  const [submit, setSubmit] = useState(false);

  const fetchCountries = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      // console.log(country.data.data);
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setSubmit(false);
    setSingleCity(null);
    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    console.log(findCities.cities);
    setCities(findCities.cities);
  };

  const submitHandler = () => {
    if (singleCountry && singleCity) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Select your HomeTown</h1>
        <div>
          {countries && (
            <select
              onChange={(e) => fetchCities(e.target.value)}
              value={singleCountry}
            >
              <option disabled hidden selected>
                Select Country
              </option>
              {countries.map((country) => (
                <option
                  key={`${country.country}-${Date.now()}`}
                  value={country.country}
                >
                  {country.country}
                </option>
              ))}
            </select>
          )}
          {cities && (
            <select
              onChange={(e) => setSingleCity(e.target.value)}
              value={singleCity}
            >
              <option disabled hidden selected>
                Select City
              </option>
              {cities.map((city) => (
                <option value={city} key={`${city}`}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button onClick={submitHandler}>Go</button>
        </div>
        {submit && (
          <h3>
            Your country is {singleCountry} and your city is {singleCity}.
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
