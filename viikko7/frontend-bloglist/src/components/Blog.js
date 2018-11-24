import React from 'react'
import { connect } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  delete = (event) => {
    if (window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}?`)) {
        try {
          this.props.deleteBlog()
          this.props.history.push('/blogs')
        } catch (exception) {
          console.log(exception)
        }
    }
  }

  like = (event) => {
    this.props.increaseLikes(this.props.blog)
  }

  render() {
    const deleteButtonStyle = {
      backgroundColor: 'blue',
      borderRadius: 8
    }
    
    if (this.props.blog) {
      return (
        <div>
          <h2>{this.props.blog.title} by {this.props.blog.author}</h2>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
	  
          <div>{this.props.blog.likes} likes
            <button onClick={this.like}>like</button>
          </div>
	  
          <div>added by {this.props.blog.user !== undefined
            ? this.props.blog.user.name : '<undefined>'}</div>
	    
          {(this.props.blog.user === undefined || this.props.blog.user.id === this.props.user.id)
              && <button
                   onClick={this.delete}
                   style={deleteButtonStyle}>
                     delete
                </button>
          }
        </div>
      )
    }
    
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (!state.blogs) {
    return { blog: null, user: state.login }
  }
  
  const blog = state.blogs.filter(blog => blog.id === props.blogId)[0]
  
  return { blog, user: state.login }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    increaseLikes: (blog) => dispatch(increaseLikes(blog)),
    deleteBlog: (id) => dispatch(deleteBlog(props.blogId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(Blog)