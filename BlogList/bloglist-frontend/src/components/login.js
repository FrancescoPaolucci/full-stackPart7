import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogindisp } from '../reducers/userReducer'
import { Table, Form, Button } from 'react-bootstrap'
const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    dispatch(handleLogindisp(username, password))
  }
  return(
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

          <Button variant="primary" id="login-button" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default LoginForm