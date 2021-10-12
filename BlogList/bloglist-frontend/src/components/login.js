import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../reducers/userReducer'

const loginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async(event) => {
    event.preventDefault()
    dispatch(setLogin(username, password))
  }



  return(
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
}
export default loginForm