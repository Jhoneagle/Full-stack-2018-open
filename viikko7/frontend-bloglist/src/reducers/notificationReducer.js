const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'CREATE_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'CREATE_NOTIFICATION',
    content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const notify = (message, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(message))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationReducer