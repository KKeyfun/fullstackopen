// Phonebook backend with express
const express = require('express');
const morgan = require('morgan');
const phonebook = require('./expressRequestMethods/controllerExpress');

const app = express();

morgan('tiny');
morgan.token('body', (request, response) => (JSON.stringify(request.body)));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
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
  phonebook.addEntry(request, response);
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
