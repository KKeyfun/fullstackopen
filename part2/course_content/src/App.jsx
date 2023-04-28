import './App.css';

function Course({ courses }) {
  console.log(courses);
  return (
    courses.map((course) => (
      <>
        <Header text={course.name} />
        <Content course={course} />
        <Total parts={course.parts} />
      </>
    ))
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

function Total({ parts }) {
  return (
    <b>
      Total of
      {' '}
      {parts.reduce((acc, curr) => acc += curr.exercises, 0)}
      {' '}
      exercises
    </b>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course courses={courses} />
    </div>
  );
}

export default App;
