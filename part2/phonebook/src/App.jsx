import { useState } from 'react';

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
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input onChange={updateSearch} value={search} />
      </div>
      <h2>Add new entry</h2>
      <form>
        <div>
          name:
          {' '}
          <input onChange={updateNameInput} value={newName} />
        </div>
        <div>
          number:
          {' '}
          <input value={newNumber} onChange={updateNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        debug:
        {' '}
        {newName}
      </div>
      <Display list={filteredPersons} />
    </div>
  );
}
export default App;
