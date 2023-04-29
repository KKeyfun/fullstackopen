/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useEffect } from 'react';
import peopleService from './services/persons';

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
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFiltered] = useState([...persons]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    peopleService
      .getPeople()
      .then((initialPeople) => {
        console.log(initialPeople);
        setPersons(initialPeople);
        setFiltered(initialPeople);
      });
  }, []);

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
      peopleService
        .createPerson(newName, newNumber)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setSearch('');
          setFiltered(persons.concat(returnedPerson));
        });
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
