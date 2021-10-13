
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/blogReducer'
import { initializedBlogs } from './reducers/blogReducer'
import Notificationreducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import userReducer from './reducers/userReducer'
import { loggedUser } from './reducers/userReducer'

const Reducer = combineReducers({
  blog: reducer,
  notification: Notificationreducer,
  user: userReducer

})

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))
/*
const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  store.dispatch(loggedUser(user))
}
blogService.getAll().then((blogs) => store.dispatch(initializedBlogs(blogs)))
*/
export default store