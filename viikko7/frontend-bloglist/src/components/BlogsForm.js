import React from 'react'
import CreateBlogForm from './CreateBlogForm'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class BlogsForm extends React.Component {
  render() {
    const style = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (this.props.blogs) {
      return (
        <div>
          <h2>blogs</h2>
            {this.props.blogs.map(blog =>
              <div key={blog.id} style={style}>
                <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
              </div>
            )}
	    
            <CreateBlogForm />
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps)(BlogsForm)