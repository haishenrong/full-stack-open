import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}
interface TotalProps {
    parts:CoursePart[]
}

const Total = (props:TotalProps) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total;
