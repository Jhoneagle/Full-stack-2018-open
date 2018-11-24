import blogService from '../services/blogs'

const initialState = []

const compareBlogs = (blog1, blog2) => {
  if (blog2.likes !== blog1.likes) {
    return blog2.likes - blog1.likes
  }
  return blog1.title > blog2.title
}

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.blog).sort(compareBlogs)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id).sort(compareBlogs)
  case 'UPDATE_BLOG':
    return state.map(blog => blog._id === action.blog._id ? action.blog : blog).sort(compareBlogs)
  case 'GET_BLOGS':
    return action.blogs.sort(compareBlogs)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    
    dispatch({
      type: 'GET_BLOGS',
      blogs
    })
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    const blog = await blogService.create(data)
    
    dispatch({
      type: 'CREATE_BLOG',
      blog
    })
  }
}

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }
    
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

export default blogReducer