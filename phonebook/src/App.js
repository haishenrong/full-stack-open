import React, { useState } from 'react'
import Person from './components/Person'

const Persons = ({persons, text}) => {
    
  let filtered = persons.filter(person => 
    person.name.toUpperCase().includes(text.toUpperCase()));
  return(
    filtered.map(person => 
      <Person key = {person.id} person = {person}/>
    )
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit = {addName}>
    <div>
      name: <input value={newName}
      onChange={handleNameChange} />
    </div>
    <div>
      number: <input value ={newNumber}
      onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
    filter shown with<input value={newFilter} 
    onChange ={handleFilterChange} />
  </div>
  )
}

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    let names = persons.map(person => person.name)
    let numbers = persons.map(person => person.number)
    if(names.includes(newName))
    {
      window.alert("The name \"" + newName + "\" already exists in the phonebook.")
    }
    else if(numbers.includes(newNumber))
    {
      window.alert("The number \"" + newNumber + "\" already exists in the phonebook.")
    }
    else{
      const personObject = {
        id: persons.length+1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter
        newFilter = {newFilter}
        handleFilterChange={handleFilterChange}
        />
      <h2> add a new </h2>
        <PersonForm 
        addName = {addName} 
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
        />
      <h2>Numbers</h2>
      <ul>
        <Persons 
        persons={persons} 
        text = {newFilter}
        />
      </ul>
    </div>
  )
}

export default App