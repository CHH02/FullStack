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
    setToDisplay(
      (event.target.value === '')
      ? null
      : countries.filter(n => n.name.common.includes(event.target.value))
    )
  }

  const onSearch = () => {
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <Display data={toDisplay} />
    </div>
  ) 
}

export default App