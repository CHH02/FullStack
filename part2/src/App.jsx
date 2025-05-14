import axios from 'axios'
import { useState, useEffect, use } from 'react'
import Display from './components/Display'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [toDisplay, setToDisplay] = useState(null)
  const [weather, setWeather] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (toDisplay && toDisplay.length === 1) {      
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${toDisplay[0].capital[0]}&units=metric&appid=${api_key}`)
        .then(response => setWeather(
          <>
            <p>Temperature {response.data.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>Wind {response.data.wind.speed} m/s</p>
          </>
        ))
    }
  }, [toDisplay])

  const handleChange = (event) => {
    setFilter(event.target.value)
    const value = event.target.value.toLowerCase()
    setToDisplay(
      (value === '')
      ? null
      : countries.filter(n => n.name.common.toLowerCase().includes(value))
    )
  }

  const singleMatch = () => {
    setMatch(!match)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <Display
        data={toDisplay} weather={weather} setToDisplay={setToDisplay}
      />
    </div>
  ) 
}

export default App