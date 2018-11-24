import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initializeCredentials = () => {
  return async (dispatch) => {
    const userString = window.localStorage.getItem('user')
    const user = userString !== undefined ? JSON.parse(userString) : null
    
    if (user !== null) {
      dispatch({
        type: 'LOGIN',
        user
      })
      
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({username, password})
    
    window.localStorage.setItem('user', JSON.stringify(user))
    
    dispatch({
      type: 'LOGIN',
      user
    })
    
    blogService.setToken(user.token)
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
    
    window.localStorage.setItem('user', null)
  }
}

export default loginReducer