import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <Alert color="success">
      {message}
    </Alert>
  )
}

export default Notification