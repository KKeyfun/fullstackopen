import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getPeople = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const createPerson = (name, number) => {
  const request = axios.post(url, { name, number });
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => {
    if (response.status === 404) {
      return response;
    } return response.status;
  });
};

const updatePerson = (person) => {
  const request = axios.put(`${url}/${person.id}`, person);
  return request.then((response) => {
    if (response.status === 404) {
      return response;
    } return response.data;
  });
};

export default {
  getPeople,
  createPerson,
  deletePerson,
  updatePerson,
};
