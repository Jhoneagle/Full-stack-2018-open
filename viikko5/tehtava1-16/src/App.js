import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: '',
      notification: '',
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  addBlog = (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
	  notification: 'Lisäys onnistui'
        })
	setTimeout(() => {
          this.setState({ notification: '' })
        }, 5000)
      })
      .catch(error => {
        this.setState({ 
	  error: 'Lisäys epäonnistui'
	})
	setTimeout(() => {
	  this.setState({ error: '' })
	}, 5000)
      })
  }
  
  updateBlog(blogData) {
    return () => {
      const updated = {
        title: blogData.title,
        author: blogData.author,
        url: blogData.url,
        likes: blogData.likes + 1
      }

      blogService
        .update(blogData.id, updated)
        .then(updatedBlog => {
          const removed = this.state.blogs.filter(blog => blog.id !== blogData.id)
	  
	  this.setState({
            blogs: removed.concat(updatedBlog),
            notification: 'Tykkäys onnistui'
          })
	  setTimeout(() => {
            this.setState({ notification: '' })
          }, 5000)
        })
        .catch(error => {
	  this.setState({ 
	    error: 'Tykkäys ei onnistunut'
	  })
  	  setTimeout(() => {
	    this.setState({ error: '' })
  	  }, 5000)
        })
    }
  }
  
  delBlog(id) {
    return () => {
      const message = 'Oletko varma?'
      const result = window.confirm(message)
      
      if (result) {
        blogService
          .del(id)
          .then(response => {
            this.setState({
              blogs: this.state.blogs.filter(blog => blog.id !== id),
              notification: 'Poisto onnistui'
            })
	    setTimeout(() => {
              this.setState({ notification: '' })
            }, 5000)
          })
          .catch(error => {
	    this.setState({ 
	      error: 'Poisto ei onnistunut'
	    })
  	    setTimeout(() => {
	      this.setState({ error: '' })
  	    }, 5000)
          })
      }
    }
  }
  
  logout = async (event) => {
    event.preventDefault()
    
    window.localStorage.clear()
    blogService.setToken(null)
    this.setState({
      user: null,
      notification: 'Kirjauduttu ulos'
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000)
  }
  
  login = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ 
        username: '', 
	password: '', 
	user,
	notification: 'Kirjautuminen onnistui'
      })
      setTimeout(() => {
        this.setState({ notification: '' })
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'Käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }
  }

  render() {
    const loginForm = () => (
      <div className="loginForm">
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
	  <div>
            käyttäjätunnus: 
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana: 
            <input
              type="password"
              name="password"
              value={this.state.password}
	      onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const order = this.state.blogs.sort(function(a, b){return b.likes - a.likes})
    
    return (
      <div className="content">
        <Error message={this.state.error}/>
        <Notification message={this.state.notification}/>
	
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
	    <button onClick={this.logout}>log out</button>
	    
	    <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
              <BlogForm
                handleBlogChange={this.handleBlogChange}
                state={this.state}
                addBlog={this.addBlog}
              />
            </Togglable>

          </div>
        }
        
	{this.state.user === null ?
          <div></div> :
	  <div className="blogs">
            <h2>Blogs</h2>
	    {order.map(blog =>
	      <Blog
		key={blog.id} 
		blog={blog} 
		user={this.state.user}
		update={this.updateBlog(blog)}
		del={this.delBlog(blog.id)}
	      />
	    )}
          </div>
        }
      </div>
    )
  }
}

export default App;
