const express = require('express')
const app = express()

app.use(express.json())

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-1234567"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345" 
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122" 
    },
    {
      id: 5,
      name: "Martin Fowler",
      number: "37-42-1985479"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
    
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})