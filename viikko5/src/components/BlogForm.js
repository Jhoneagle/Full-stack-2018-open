import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlogChange, state, addBlog }) => {
  return (
    <div>
      <h2>Luo uusi muistiinpano</h2>
	
      <form onSubmit={addBlog}>
        <div>
        title: 
        <input
          type="title"
          name="title"
          value={state.title}
          onChange={handleBlogChange}
        />
        </div>
        <div>
          author: 
          <input
            type="author"
            name="author"
	    value={state.author}
	    onChange={handleBlogChange}
          />
        </div>
        <div>
          url: 
          <input
            type="url"
            name="url"
            value={state.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleBlogChange: PropTypes.func.isRequired
}

export default BlogForm