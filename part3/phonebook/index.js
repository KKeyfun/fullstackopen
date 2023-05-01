// Phonebook backend with express
const express = require('express');
const phonebook = require('./expressRequestMethods/controllerExpress');

const app = express();

app.use(express.json());
// Routes

// Individual note route
app.get('/api/phonebook/:id', (request, response) => {
  const id = +request.params.id;
  phonebook.getPhonebookEntry(response, id);
});

// Phonebook collection route
app.get('/api/phonebook', (request, response) => {
  phonebook.getPhonebook(response);
});

// Info route
app.get('/info', (request, response) => {
  const infoString = `Phonebook has info for ${phonebook.countPeople()} people </br> ${new Date()}`;
  response.send(infoString);
});

// New note route
app.post('/api/phonebook', (request, response) => {
  phonebook.addEntry(request.body, response);
});

// Delete note route
app.delete('/api/phonebook/:id', (request, response) => {
  const id = +request.params.id;
  phonebook.deleteEntry(response, id);
});

// Update note route
app.put('/api/phonebook/:id', (request, response) => {
  const id = +request.params.id;
  phonebook.updateEntry(response, request.body, id);
});

app.listen(3001);
