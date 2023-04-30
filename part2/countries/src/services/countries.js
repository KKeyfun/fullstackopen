import axios from 'axios';

const url = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,area,languages,cca3';

const getCountries = () => {
  const request = axios.get(url);
  console.log('should only be called on page load');
  return request.then((response) => response.data);
};

export default {
  getCountries,
};
