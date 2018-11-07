import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const fullDetails = () => (
      <div>
        <div onClick={this.toggleVisibility}>
	  {this.props.blog.title} {this.props.blog.author}
	</div>
	<div>
	  {this.props.blog.url}
	</div>
	<div>
	  {this.props.blog.likes} likes <button onClick={this.props.update}>like</button>
	</div>
	<div>
	  added by {this.props.user.username}
	</div>
	<div>
	  {this.props.user._id === this.props.blog.user.id ?
            <button onClick={this.props.del}>poista</button> :
	    <div></div>
          }
	</div>
      </div>
    )

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</div>
        </div>
        <div style={showWhenVisible}>
          <div>
            {fullDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog