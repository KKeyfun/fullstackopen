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

function Button({ clickHandler, text }) {
  return (
    <button onClick={clickHandler}>{text}</button>
  );
}

function PersonForm({ inputs, button }) {
  return (
    <div>
      <form>
        <Header text="Add new entry" />
        {inputs.map((input) => <Input key={input.label} label={input.label} value={input.value} event={input.event} />)}
        <Button clickHandler={button.event} text="Add" />
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
        // console.log(initialPeople);
        setPersons(initialPeople);
        setFiltered(initialPeople);
      });
  }, []);

  function checkIssues(name, number) {
    for (const person of persons) {
      if (person.name.toLowerCase() === name.toLowerCase() && person.number === number) {
        return true;
      }
      if (person.name.toLowerCase() === name.toLowerCase()) {
        console.log(person, typeof (person));
        return person;
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
    const checkIssueReturn = checkIssues(newName, newNumber);
    if (checkIssueReturn === true) {
      alert(`${newName} : ${newNumber} is already in phonebook`);
    } else if (newName === '' || newNumber === '') {
      alert('Name/Number field is empty');
    } else if (typeof (checkIssueReturn) === 'object') {
      const overwrite = window.confirm('This person already exists. Do you want to update their phone number?');
      if (overwrite) {
        const modifiedPerson = { ...checkIssueReturn, number: newNumber };
        peopleService
          .updatePerson(modifiedPerson)
          .then((updatedPerson) => {
            const updatedPeopleList = persons.map(
              (person) => (person.id === updatedPerson.id ? updatedPerson : person),
            );
            setPersons(updatedPeopleList);
            setNewName('');
            setNewNumber('');
            setSearch('');
            setFiltered(updatedPeopleList);
          });
      }
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

  function deletePerson(id) {
    peopleService
      .deletePerson(id)
      .then((status) => {
        console.log(status, typeof (status));
        if (status === 200) {
          const filteredPeople = persons.filter((person) => person.id !== id);
          setPersons(filteredPeople);
          setSearch('');
          setFiltered(filteredPeople);
        }
      });
  }

  function updateNumberInput(event) {
    setNewNumber(event.target.value);
  }

  function Display({ list }) {
    return (
      list.map((person) => (
        <li key={person.id}>
          {person.name}
          {' '}
          {person.number}
          <Button clickHandler={() => { deletePerson(person.id); }} text="Delete" />
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
