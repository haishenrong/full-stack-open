import React from 'react'


function Header({course}) {
  return(
    <div>
        <h1>
          {course}
        </h1>
    </div>
  )
}

function Content({parts}) {
  return(
      <div>
        <ul>
        {parts.map(part =>
          <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
        )}
        </ul>
      </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <li>{name + " " + exercises}</li>
  )
}


function Total({parts}) {
  const array1 = parts.map(part => part.exercises)
  const sum = (incrementor, curVal) => incrementor + curVal;
  let total = array1.reduce(sum);
  return(
    <div>
        <p>
          {"Total exercises = "+total}
        </p>
    </div>
  )
}

const Course = ({name, parts}) => {
  return(
    <div>
        <Header course = {name} />
        <Content parts = {parts} />
        <Total parts = {parts} />
    </div>
  )
}

const Courses = ({courses}) => {
  return(
    <div>
      {courses.map(course =>
          <Course key = {course.id} name = {course.name} parts = {course.parts}/>
      )}
      
    </div>
  )
}
export default Courses