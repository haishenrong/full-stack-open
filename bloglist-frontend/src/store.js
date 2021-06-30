import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import usernameReducer from './reducers/usernameReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  username: usernameReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)



export default store