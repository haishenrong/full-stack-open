const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    console.log(time)
    dispatch({
    type: 'SET',
    data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000)
  }
}
export default notificationReducer