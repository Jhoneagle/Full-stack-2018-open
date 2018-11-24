import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({ user, logout }) => {
  const style = {
    backgroundColor: 'lightGrey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }
  
  return (
    <div style={style}>
      <NavLink to="/blogs">blogs</NavLink>&emsp;
      
      <span>{user.name} logged in&emsp;
        <button onClick={logout}>logout</button>
      </span>
    </div>
  )
}

export default Menu