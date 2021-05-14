import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

const Persons = ({persons, text, deletePerson}) => {
  if(persons.length>=1){
  let filtered = persons.filter(person => 
      person.name.toUpperCase().includes(text.toUpperCase()));
    return(
      filtered.map(person => 
        <Person 
          key = {person.id} 
          person = {person}
          deletePerson = {() => deletePerson(person.id)}
        />
      )
    )
  }
  return(
    <div>
      Blank Phonebook
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit = {addPerson}>
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

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let names = persons.map(person => person.name)
    let numbers = persons.map(person => person.number)
    let ids = persons.map(person => person.id)
    let id = 1;
    while(id<=ids.length && id === ids[id-1]){ id++ }
    if(names.includes(newName))
    {
      if( window.confirm("The name \"" + newName + "\" already exists in the phonebook, replace the old number with a new one?")){
        const personObject = persons.find(person => person.name == newName)
        const changedPerson = { ...personObject, number:newNumber}
        personService
          .update(changedPerson.id,changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))
          }
        )
      }
    }
    else if(numbers.includes(newNumber))
    {
      if( window.confirm("The number \"" + newNumber + "\" already exists in the phonebook, replace the old name with a new one?")){
        const personObject = persons.find(person => person.number === newNumber)
        const changedPerson = { ...personObject, name:newName}
        personService
          .update(changedPerson.id,changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))
          }
        )
      }
    }
    else{
      const personObject = {
        id: Math.min(persons.length+1, id),
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(nextPerson => {
          setPersons(persons.concat(nextPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const deletePerson = (id) => { 
    personService
    .deletePerson(id)
    .then(resultPersons => {
      console.log(resultPersons)
      const filteredPersons = persons.filter(person => person.id !== id);
      setPersons(filteredPersons)
    })
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
        addPerson = {addPerson} 
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
        deletePerson = {deletePerson}
        />
      </ul>
    </div>
  )
}

export default App