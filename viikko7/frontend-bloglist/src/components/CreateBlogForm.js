import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class CreateBlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      createBlogFormVisible: false
    }
  }

  create = (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      
      this.props.createBlog(newBlog)
      
      const msg = `a new blog '${this.state.title}' by ${this.state.author} added`
      this.props.notify(msg, 5)
      
      this.setState({
        title: '',
        author: '',
        url: '',
        createBlogFormVisible: false
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.createBlogFormVisible) {
      return (
        <div>
          <h3>Create new blog</h3>
          <form onSubmit={this.create}>
            <div>title:
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>author:
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>url:
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit">create</button>
          </form>
          <button onClick={e => this.setState({ createBlogFormVisible: false })}>
            cancel
          </button>
        </div>
      )
    }
    
    return (
      <div>
        <button onClick={e => this.setState({ createBlogFormVisible: true })}>
          create new blog
        </button>
      </div>
    )
  }
}

export default connect( null, { createBlog, notify })(CreateBlogForm)