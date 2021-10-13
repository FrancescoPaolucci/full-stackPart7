import React, { useState, useEffect, useRef } from 'react'
import BlogDetails from './components/Blog'
import BlogTitles from './components/BlogTitles'
import Togglable from './components/Togglable.js'
import BlogsForm from './components/BlogsForm'
import './index.css'
import LoginForm from './components/login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializedBlogs } from './reducers/blogReducer'
import { handleLogindisp, logOut } from './reducers/userReducer'
import { loggedUser } from './reducers/userReducer'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from 'react-router-dom'
import userService from './services/users'


const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

const Userlist = ({ users }) => {
  return(
    <div>
      <p>USERS: NUMBER OF BLOGS</p>
      {users.map((a) => (
        <li key={a.id}>
          <p>    <Link to={`/user/${a.id}`}>{a.name}</Link> {a.blogs.length} </p>
        </li>

      ))}
    </div>
  )}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return(
    <div>
      <h1> {user.name} </h1>
      <h3>Added blogs:</h3>
      <div> {user.blogs.map((a) => (
        <li key = {a.id}>
          <h4>{a.title}<p>Likes:{a.likes}</p></h4>
        </li>
      ))} </div>
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  //const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const blogsFormRef = useRef()
  const dispatch = useDispatch()
  // const blogs1 = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializedBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loggedUser())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  let allora = users.map((a) => a.blogs.length)
  console.log(allora)


  //const users1 = blogs1.map((a) => a.user)
  //console.log(users1[2])
  /*
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
/*
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
              console.log(target.value)
            }}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button variant="primary" id="login-button" type="submit" onClick={handleLogin}>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
*/
  const blogsForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogsFormRef}>
      <BlogsForm />
    </Togglable>
  )
  const padding = {
    padding: 5
  }
  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user
                  ? <em style={padding}>{user.name} logged in</em>
                  : <Link style={padding} to="/login">login</Link>
                }
              </Nav.Link>
              <Button variant="primary"
                onClick={() => {
                  window.localStorage.clear()
                  dispatch(logOut())
                }}
              >
              Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <h2>Blogs</h2>
          <Error message={errorMessage} />
          <Notification />
          <Switch>
            <Route path="/home">
              {user?(
                <div>
                  <div>{blogsForm()}</div>
                  <div>
                    <BlogTitles />
                  </div>
                </div>
              ):(<Redirect to="/login" />)
              }
            </Route>

            <Route path = "/login">
              {user ?  <Redirect to="/home" /> :  <div>{/*loginForm()*/ } <LoginForm/></div>}
            </Route>
            <Route path="/users">
              {user ? <Userlist users={users} /> : <Redirect to="/login" />}
            </Route>
            <Route path="/user/:id">
              <User users={users}/>
            </Route>
            <Route path="/blogs">
              <BlogTitles />
            </Route>
            <Route path="/blog/:id">
              <BlogDetails/>
            </Route>
          </Switch>
        </div>

      </Router>
    </div>
  )
}

export default App
