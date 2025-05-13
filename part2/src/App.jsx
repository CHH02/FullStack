import axios from 'axios'
import { useState, useEffect, use } from 'react'
import Display from './components/Display'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [toDisplay, setToDisplay] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    const value = event.target.value.toLowerCase()
    setToDisplay(
      (value === '')
      ? null
      : countries.filter(n => n.name.common.toLowerCase().includes(value))
    )
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <Display data={toDisplay} setToDisplay={setToDisplay} />
    </div>
  ) 
}

export default App