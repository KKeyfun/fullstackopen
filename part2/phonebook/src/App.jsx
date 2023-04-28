/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

function Header({ text }) {
  return (
    <h2>{text}</h2>
  );
}

function Input({ label, value, event }) {
  return (
    <div>
      <label>{label}</label>
      <input onChange={event} value={value} />
    </div>

  );
}

function PersonForm({ inputs, button }) {
  return (
    <div>
      <form>
        <Header text="Add new entry" />
        {inputs.map((input) => <Input key={input.label} label={input.label} value={input.value} event={input.event} />)}
        <button type="submit" onClick={button.event}>Add</button>
      </form>
    </div>

  );
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [filteredPersons, setFiltered] = useState([...persons]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  function checkIssues(name, number) {
    for (const person of persons) {
      if (person.name === name) {
        return true;
      }
      if (person.number === number) {
        return true;
      }
    }
    return false;
  }

  function updateSearch(event) {
    setSearch(event.target.value);
    if (!event.target.value) {
      setFiltered(persons);
    } else {
      setFiltered(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  }

  function updateNameInput(event) {
    setNewName(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();
    if (checkIssues(newName, newNumber)) {
      alert(`${newName} or ${newNumber} is already in phonebook`);
    } else if (newName === '' || newNumber === '') {
      alert('Name/Number field is empty');
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
      setSearch('');
      setFiltered(persons.concat({ name: newName, number: newNumber }));
    }
  }

  function updateNumberInput(event) {
    setNewNumber(event.target.value);
  }

  function Display({ list }) {
    return (
      list.map((person) => (
        <li key={person.name}>
          {person.name}
          {' '}
          {person.number}
        </li>
      ))
    );
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Input label="Filter shown with:" value={search} event={updateSearch} />
      <PersonForm
        inputs={[
          {
            label: 'Name:',
            value: newName,
            event: updateNameInput,
          },
          {
            label: 'Number:',
            value: newNumber,
            event: updateNumberInput,
          },
        ]}
        button={
        {
          event: addPerson,
        }
      }
      />

      <Header text="Numbers" />
      <Display list={filteredPersons} />
    </div>
  );
}
export default App;
