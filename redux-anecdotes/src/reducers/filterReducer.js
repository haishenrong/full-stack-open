const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'EDIT':
      return action.data
    default:
      return state
  }
}

export const changeFilter = (content) => {
  return {
    type: 'EDIT',
    data: content
  }
}



export default filterReducer