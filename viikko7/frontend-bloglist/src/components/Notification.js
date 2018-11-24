import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const getNotificationDiv = () => this.props.notification === null ?
      null : ( <div className="notification">{this.props.notification}</div> )

    return getNotificationDiv()
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)