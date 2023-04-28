import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  function newPerson(event) {
    setNewName(event.target.value);
    console.log(event.target.value, 'typing');
  }

  function addPerson(event) {
    event.preventDefault();
    console.log(event, 'clicked');
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  function Display({ list }) {
    console.log(list);
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
