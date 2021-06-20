import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ADD': {
      return [...state, action.data]
     }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export const voteInFavor = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
    type: 'VOTE',
    data: { id }
    })
  }
}
export default anecdoteReducer