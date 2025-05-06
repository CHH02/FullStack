/* FullStackOpen Exercise 2.1 to 2.5 */

// Header component for displaying the title of a course
const Header = (props) => {
  console.log(props)
  return <h2>{props.course}</h2>
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
      {props.parts.map(part => <Part part={part} key={part.id} />)}
    </div>
  )
}

// Total component for calculating a sum of exercises displaying in our App component seen further below
const Total = (props) => {
  console.log(props)
  return <p><strong>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</strong></p>
}

// Course component for dispalying a course in the App component seen further below
const Course = ({course}) => {
  console.log(course);  
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App