  
import React, {useState} from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { SET_BIRTHYEAR } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState(null)
  const [setBornTo, changeSetBornTo] = useState('')
  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR)

  if (!props.show) {
    return null
  }

  const authors = props.authors
 
  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const submit = (event) => {
    event.preventDefault()
    setBirthyear({ variables: { name: name.value, setBornTo } })

    setName(null)
    changeSetBornTo('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <Select
            defaultValue = {name}
            onChange = {setName}
            options = {options}
          />
          <div>
            born <input value={setBornTo}
              onChange={({ target }) => changeSetBornTo(Number(target.value))}
            />
          </div>
          <button type='submit'>updateAuthor</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
