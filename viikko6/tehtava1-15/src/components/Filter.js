import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.setFilter(event.target.value)
  }
  
  render() {
    return (
      <div className="filter">
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(null, { setFilter })(Filter)