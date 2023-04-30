/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useState } from 'react';
import countryService from './services/countries';

function UnorderedList({ array }) {
  if (array === null) {
    return null;
  }
  if (array === false) {
    return <div>Too many results, specify another filter or adjust your search</div>;
  }
  if (array.length > 1) {
    return (
      <ul>
        {array.map((country) => <li key={country.cca3}>{country.name.official}</li>)}
      </ul>
    );
  }
  if (array.length === 1) {
    const country = array[0];
    const langArr = [];
    for (const key in country.languages) {
      langArr.push(country.languages[key]);
    }
    return (
      <>
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
        <img src={country.flags.png} />
      </>

    );
  }
  return null;
}

function DisplayCountry() {
  // return
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
      if (country.length === 1) {
        // display more details
      } else {
        const filteredList = country.filter((c) => c.name.official.toLowerCase().includes(searchInput.toLowerCase()));
        if (filteredList.length > 10) {
          setFilteredCountry(false);
        } else {
          setFilteredCountry(filteredList);
        }
      }
    } else {
      setFilteredCountry(null);
    }
  }

  function updateSearch(event) {
    setSearch(event.target.value);
    updateCountry(event.target.value);
    // console.log(event.target.value, search);
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
