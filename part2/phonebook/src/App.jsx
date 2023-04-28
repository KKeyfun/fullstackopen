import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  function checkIssues(name) {
    for (const person of persons) {
      if (person.name === name) {
        return 'nameConflict';
      }
      if (name === '') {
        return 'empty';
      }
    }
    return false;
  }

  function newPerson(event) {
    setNewName(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();
    if (checkIssues(newName) === 'nameConflict') {
      alert(`${newName} is already in phonebook`);
    } else if (checkIssues(newName) === 'empty') {
      alert('Name field is empty');
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }
  }

  function Display({ list }) {
    return (
      list.map((person) => <li key={person.name}>{person.name}</li>)
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          {' '}
          <input onChange={newPerson} />
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
