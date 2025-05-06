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

export default Course