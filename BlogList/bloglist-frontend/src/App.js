import React, { useState, useEffect, useRef } from 'react'
import BlogDetails from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable.js'
import BlogsForm from './components/BlogsForm'
import './index.css'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializedBlogs } from './reducers/blogReducer'
import { handleLogindisp, logOut } from './reducers/userReducer'
import { loggedUser } from './reducers/userReducer'
const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogsFormRef = useRef()
  const dispatch = useDispatch()
  const blogs1 = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializedBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loggedUser())
  }, [dispatch])



  console.log('#####11', blogs1.map((a) => {return a.title}))



  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      dispatch(handleLogindisp(username,password))
    }catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => {
            setUsername(target.value)
            console.log(target.value)
          }}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogsForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogsFormRef}>
      <BlogsForm />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Error message={errorMessage} />
      <Notification />
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <button
              onClick={() => {
                window.localStorage.clear()
                dispatch(logOut())
              }}
            >
              Log out
            </button>
          </p>
          <div>{blogsForm()}</div>
          <div>
            <BlogDetails/>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
