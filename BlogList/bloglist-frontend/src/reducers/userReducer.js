import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state=[], action) => {
  switch (action.type){
  case 'LOGGED_IN':
    state = action.data
    return state
  case 'LOG_IN':
    state = action.data
    return state
  case 'LOG_OUT':
    window.localStorage.clear()
    action.data=null
    return state = null
  default:
    return state
  }
}


export const  loggedUser  = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    await window.localStorage.clear()
    dispatch({
      type:'LOG_OUT',

    })
  }
}

export const handleLogindisp = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user,
    })
  }
}

export default userReducer