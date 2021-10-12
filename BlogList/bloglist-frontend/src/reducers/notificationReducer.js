const Notificationreducer = (state = null, action) => {
  switch (action.type) {
  case 'CORRECT_NOTI':
    state = action.data
    return state
  case 'ADD_NOTI':
    state = action.data
    return state
  case 'HIDE_NOTIFCATION':
    return (state = null)
  default:
    return state
  }
}
let timoutID
export const correctNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({ type: 'CORRECT_NOTI', data: message })
    if (timoutID) {
      clearTimeout(timoutID)
    }
    timoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const hideNotification = () => {
  return async (dispatch) => {
    dispatch({ type: 'HIDE_NOTIFCATION' })
  }
}

export const addNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_NOTI', data: message })
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default Notificationreducer
