import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      <Display list={persons} />
    </div>
  );
}
export default App;
