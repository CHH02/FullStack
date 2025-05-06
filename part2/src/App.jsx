/* FullStackOpen Exercise 2.1 */

// Header component for displaying the title of a course
const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

// Part component for displaying the indvidual parts of a course's content
const Part = (props) => {
  console.log(props)
  return <p>{props.part.name} {props.part.exercises}</p>
}

// Content component for displaying the content of a course
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

// Total component for calculating a sum of exercises displaying in our App component seen further below
const Total = (props) => {
  console.log(props)
  return <p><strong>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</strong></p>
}

// Course component for dispalying a course in the App component seen further below
const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// App component for displaying FullStackOpen's course information
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App