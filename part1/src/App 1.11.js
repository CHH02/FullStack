import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  console.log("Button: ", handleClick, text)
  return <button onClick={handleClick}>{text}</button>
}

const Display = ({ text }) => {
  console.log("Display: ", text)
  return <div><h1>{text}</h1></div>
}

const StatisticLine = ({ text, value }) => {
  console.log("StatisticLine: ", text, value)
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({ good, neutral, bad, total, avg, pos }) => {
  if (total == 0) {
    return <table><tbody><StatisticLine text="No feedback given" value="" /></tbody></table>
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={pos + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const settingGood = newVal => {
    setGood(newVal)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    setAvg((newVal-bad)/updatedTotal)
    setPos((newVal/updatedTotal)*100)
  }

  const settingNeutral = newVal => {
    setNeutral(newVal)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    setAvg((good-bad)/updatedTotal)
    setPos((good/updatedTotal)*100)
  }

  const settingBad = newVal => {
    setBad(newVal)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    setAvg((good-newVal)/updatedTotal)
    setPos((good/updatedTotal)*100)
  }

  return (
    <div>
      <Display text="give feedback" />
      <Button handleClick={() => settingGood(good + 1)} text="good" />
      <Button handleClick={() => settingNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => settingBad(bad + 1)} text="bad" />
      <Display text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} pos={pos} />
    </div>
  )
}

export default App