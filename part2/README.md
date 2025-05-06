# FullStack-Part2
This is for the submission of exercises 2.1-2.20 of the Full OpenStack course. See Full Stack open part 2 [here](https://fullstackopen.com/en/part2)

## Objective
- Ex 2.5
    - ex 2.1-2.5 are exercises that implement better practices on ex 1.5's application, e.g., using higher-order functions and modularity for optimization.

## My Apps

### Ex 2.1
- modified Ex 1.5 app with a modularized course component section, e.g., a course component outside of the app component for dispalying course information.  
![PNG of CHH02's Exercise 2.1 submission](./public/Ex2-1_Screenshot.png)

### Ex 2.2
 - modified Ex 2.1 to include the total number of exercises
![PNG of CHH02's Exercise 2.2 submission](./public/Ex2-2_Screenshot.png)
```JSX
// Total component for calculating a sum of exercises displaying in our App component seen further below
const Total = (props) => {
  console.log(props)
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
}
```

### Ex 2.3
 - modified Ex 2.2 to calculate the total number of exercises using the [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) array function.
```JSX
// Total component for calculating a sum of exercises displaying in our App component seen further below
const Total = (props) => {
  console.log(props)
  return <p><strong>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</strong></p>
}
```