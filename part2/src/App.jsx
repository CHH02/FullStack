import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [typeOfMessage, setTypeOfMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  
  
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    const samePerson = persons.find(person => person.name === nameObject.name)

    {
      (samePerson !== undefined && samePerson.number === nameObject.number)
      ? alert(`${nameObject.name} is already added to phonebook`)
      : (samePerson !== undefined && samePerson.number !== nameObject.number)
        ? updatePerson(samePerson, nameObject.number)
        : personService
            .create(nameObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setTypeOfMessage('success')
              setMessage(`Added ${returnedPerson.name}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000);
            })
            .catch(error => {
              setTypeOfMessage('error')
              setMessage(`Information of ${nameObject.name} has already been removed from server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000);
            })
    }
  }

  const updatePerson = (person, number) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(person.id, {...person, number: number})
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.map(n => n.id === person.id ? returnedPerson : n))
          setNewName('')
          setNewNumber('')
          setTypeOfMessage('success')
          setMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setTypeOfMessage('error')
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`) === true) {
      personService
          .remove(person.id)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.filter(n => n.id !== person.id))
          })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)    
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  
  const personsToShow = (newFilter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={typeOfMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App