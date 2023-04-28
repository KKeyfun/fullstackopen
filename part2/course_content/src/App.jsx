import './App.css';

function Course({ course }) {
  return (
    <>
      <Header text={course.name} />
      <Content course={course} />
      <b>
        Total of
        {' '}
        {course.parts.reduce((acc, curr) => acc += curr.exercises, 0)}
        {' '}
        exercises
      </b>
    </>
  );
}

function Content({ course }) {
  return (
    course.parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  );
}

function Header({ text }) {
  return (
    <h1>{text}</h1>
  );
}

function Part({ name, exercises }) {
  return (
    <p>
      {name}
      {' '}
      {exercises}
    </p>
  );
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

export default App;
