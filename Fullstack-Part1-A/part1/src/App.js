import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  console.log("Button: ", handleClick, text)
  return <button onClick={handleClick}>{text}</button>
}

const Display = ({ text }) => {
  console.log("Display: ", text)
  return <div><h1>{text}</h1></div>
}

const Data = ({ text, value }) => {
  console.log("Data: ", text, value)
  return <p style={{ margin: 0}}>{text} {value}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display text="statistics" />
      <Data text="good" value={good} />
      <Data text="neutral" value={neutral} />
      <Data text="bad" value={bad} />
    </div>
  )
}

export default App