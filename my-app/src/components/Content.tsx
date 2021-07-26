import React from 'react';

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartDescription {
    type: "special";
    requirements: string[];
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const Part = (part:CoursePart) => {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            </p>
          </div>
        );
      case "groupProject":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              project exercises {part.groupProjectCount}
            </p>
          </div>
        );
      case "submission":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            <br></br>
              submit to {part.exerciseSubmissionLink}
            </p>
          </div>
        );
      case "special":
        return (
          <div>
            <h2>
              {part.name} {part.exerciseCount}
            </h2>
            <p>
              {part.description}
            <br></br>
              required skills: {part.requirements.join(', ')}
            </p>
          </div>
        );
      default:
        return assertNever(part);
    }
  }
  interface ContentProps {
    parts:CoursePart[]
}

const Content = (props:ContentProps) => {
  return (
    <div>
      {props.parts.map(p => Part(p))}
    </div>
  )
}

export default Content;