import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if(localToken)
    setToken(localToken)
  },[])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const resAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const resBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const client = useApolloClient()

  if (resBooks.loading || resAuthors.loading)  {
    return <div>loading...</div>
  }
 
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span>:
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        authors = {resAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books = {resBooks.data.allBooks}
        token = {token}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm 
        show = {page === 'login'}
        setToken = {setToken}
        setPage = {setPage}
      />

    </div>
  )
}

export default App