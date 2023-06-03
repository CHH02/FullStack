import { useState } from 'react'

const Display = () => {
  return {}
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const randomSelect = () => {
    let newVal = Math.floor(Math.random() * anecdotes.length)
    console.log('randomly generated number: ', newVal)
    setSelected(newVal)
  }

  const setVote = () => {
    const newVotes = [ ...votes ]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log('votes = ', newVotes)
  }

  console.log('Anecdote with most votes: ', votes.indexOf(Math.max(...votes)))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p style={{ margin: 0 }}>{anecdotes[selected]}</p>
      <Button handleClick={setVote} text='vote' />
      <Button handleClick={randomSelect} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p style={{ margin: 0 }}>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

export default App