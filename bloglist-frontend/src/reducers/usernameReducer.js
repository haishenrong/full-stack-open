const usernameReducer = (state = '', action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return ''
  default:
    return state
  }
}

export const setCurrentUser = (content) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: content
    })
  }
}

export const clearCurrentUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}
export default usernameReducer