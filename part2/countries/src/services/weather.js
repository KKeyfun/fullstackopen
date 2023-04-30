import axios from 'axios';

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0e7be966690eee02e94ba24b5e31ab3`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default getWeather;
