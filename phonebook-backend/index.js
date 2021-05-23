require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

// Lets frontend in
app.use(cors())
// Using production build copied from frontend
app.use(express.static('build'))
app.use(express.json())

morgan.token("postPerson", function (req, res) {
  return JSON.stringify({
    "name": req.body.name,
    "number": req.body.number
  })
})
app.use(morgan(':method :url :response-time :postPerson'))

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


const generateId = () => {
  let nextId = Math.floor(Math.random()*1000000)+5
  while(persons.map(p => p.id).includes(nextId))
  {
    nextId++;
  }
  return nextId
}



app.get('/info', (request, response) => {
let counter = 0;
  Person.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err)
    } else {
      counter = count
      response.send(
        `<div> Phonebook has info for ${counter} people</div>
        <div>${new Date}</div>`)
    }
  });
  //console.log(numDocs)

})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
/* For now same names are allowed
  if(persons.map(p => p.name).includes(body.name))
  {
    return response.status(400).json({ 
      error: 'name already exists' 
    })
  }
  */

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})