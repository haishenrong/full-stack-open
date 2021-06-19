const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'CREATE':
      return 'Created a new anecdote '+action.data
    case 'LIKES':
      return 'You voted for ' + action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const createdAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: content
  }
}

export const votedFor = (content) => {
  return {
    type: 'LIKES',
    data: content
  }
}

export const clear = () => {
    return {
      type: 'CLEAR'
    }
  }

export default notificationReducer