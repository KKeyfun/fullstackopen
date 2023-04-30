/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useState } from 'react';
import countryService from './services/countries';
import weatherService from './services/weather';

function ListItem({ country }) {
  const [active, setActive] = useState(false);
  return (
    <li>
      {country.name.official}
      <button onClick={() => {
        if (active) {
          event.target.textContent = 'Show';
        } else {
          event.target.textContent = 'Hide';
        }
        setActive(!active);
      }}
      >
        Show
        {' '}
      </button>

      { active ? (<CountryView country={country} />) : null }
    </li>
  );
}

function UnorderedList({ array }) {
  if (array === null) {
    return null;
  }
  if (array === false) {
    return <div>Too many results, specify another filter or adjust your search</div>;
  }
  if (array.length > 0) {
    return (
      <ul>
        {array.map((country) => (
          <ListItem country={country} key={country.cca3} />
        ))}
      </ul>
    );
  }
}

function CountryView({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const requestWeather = weatherService(country.capital[0]);
    requestWeather.then((data) => setWeather(data));
  }, []);

  if (weather) {
    return (
      <div className="countryView">
        <h2>{country.name.official}</h2>
        <br />
        <div>
          Capital:
          {' '}
          {country.capital[0]}
        </div>
        <div>
          Area:
          {' '}
          {country.area}
        </div>
        <br />
        <b>Languages:</b>
        <ul>
          {Object.keys(country.languages).map((key) => <li key={country.languages[key]}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>
          Weather In
          {' '}
          {country.capital[0]}
        </h2>
        <div>
          {weather.weather[0].description}
        </div>
        <div>
          Temperature:
          {' '}
          {weather.main.temp}
          {' '}
          Celsius
        </div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div>
          Wind:
          {' '}
          {weather.wind.speed}
          {' '}
          m/s
        </div>
      </div>
    );
  }
}

function App() {
  const [country, setCountry] = useState(null);
  const [filteredCountry, setFilteredCountry] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const countryList = countryService.getCountries();
    countryList.then((data) => {
      setCountry(data);
    });
  }, []);

  function updateCountry(searchInput) {
    if (searchInput.length > 1) {
      const filteredList = country.filter((c) => c.name.official.toLowerCase().includes(searchInput.toLowerCase()));
      if (filteredList.length > 10) {
        setFilteredCountry(false);
      } else {
        setFilteredCountry(filteredList);
      }
    } else {
      setFilteredCountry(null);
    }
  }

  function updateSearch(event) {
    setSearch(event.target.value);
    updateCountry(event.target.value);
  }

  return (
    <>
      <div className="searchLabel">Find your country </div>
      <input onChange={updateSearch} value={search} />
      <UnorderedList array={filteredCountry} />
    </>
  );
}

export default App;
