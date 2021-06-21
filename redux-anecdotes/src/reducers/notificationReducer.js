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
let timeOut = setTimeout(function() {}, 1)
export const setNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeOut)
    dispatch({
    type: 'SET',
    data: content
    })
    timeOut = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000)
  }
}
export default notificationReducer