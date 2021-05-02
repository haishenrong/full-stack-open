import React from 'react'

function Header(props) {
  return(
    <div>
        <p>
          {props.course}
        </p>
    </div>
  )
}

function Content(props) {
  return(
    <div>
      <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises} />
      <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises} />
      <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises} />
    </div>
  )
}

function Part(props) {
  return(
    <div>
        <p>
        {props.name + " " + props.exercises}
        </p>
    </div>
  )
}

function Total(props) {
  return(
    <div>
        <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
        </p>
    </div>
  )
}

function App() {

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
    <div className="App">
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  );
}

export default App;
