const Header = (prop) => {
  console.log(prop);
  return (
    <h1>{prop.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

// 1.1
// const Content = (props) => {
//   return (
//     <p>{props.part} {props.exercise}</p>
//   )
// }

// 1.2
// const Content = (props) => {
//   const content = [];
//   for(let i=0;i<props.parts.length;i++){
//     content.push(<Part key={props.parts[i]} part={props.parts[i]} exercise={props.exercises[i]}/>);
//   }
//   return (
//     <div>
//         {content}
//     </div>
//   )
// }

// 1.3
const Content = (props) => {
  const content = [];
  props.parts.forEach(part => {
    content.push(<Part key={part.name} part={part.name} exercise={part.exercises}/>);
  })
  return (
    <div>
        {content}
    </div>
  )
}

// 1.1 & 1.2
// const Total = (prop) => {
//   let sum = 0;
//   prop.exercises.forEach(exercise => {
//     sum += exercise
//   });
//   return (
//     <p>Number of exercises {sum}</p>
//   )
// }

//1.3
const Total = (props) => {
  let sum = 0;
  props.parts.forEach( part => {
    sum += part.exercises;
  });
  return (
    <p>Number of Exercises {sum}</p>
  )
}

// 1.1 & 1.2
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   // 1.1
//   // return (
//   //   <div>
//   //     <Header course={course}/>
//   //     <Content part={part1} exercise={exercises1}/>
//   //     <Content part={part2} exercise={exercises2}/>
//   //     <Content part={part3} exercise={exercises3}/>
//   //     <Total exercises={[exercises1,exercises2,exercises3]}/>
//   //   </div>
//   // )
  
//   // 1.2
//   return (
//     <div>
//       <Header course={course}/>
//       <Content parts={[part1,part2,part3]} exercises={[exercises1,exercises2,exercises3]}/>
//       <Total exercises={[exercises1,exercises2,exercises3]}/>
//     </div>
//   )
// }

// 1.3
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course={course}/>
//       <Content parts={[part1,part2,part3]}/>
//       <Total parts={[part1,part2,part3]}/>
//     </div>
//   )
// }

// 1.4
// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]

//   return (
//     <div>
//       <Header course={course}/>
//       <Content parts={parts}/>
//       <Total parts={parts}/>
//     </div>
//   )
// }

// 1.5
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
