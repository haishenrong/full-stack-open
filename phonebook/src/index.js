import ReactDOM from 'react-dom'
import App from './App.js'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-1234567'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  { 
    id: 3,
    name: 'Dan Abramov', 
    number: '12-43-234345' 
  },
  { 
    id: 4,
    name: 'Mary Poppendieck', 
    number: '39-23-6423122' 
  },
  {
    id: 5,
    name: 'Martin Fowler',
    number: '37-42-1985479'
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)