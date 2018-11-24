import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { notify } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logout, initializeCredentials } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Blog from './components/Blog'
import Menu from './components/Menu'
import './index.css'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeCredentials()
    this.props.initializeBlogs()
    this.props.initializeUsers()
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Bloglist</h1>
	  
          {this.props.user !== null &&
            <Menu user = {this.props.user}
              logout = {this.props.logout} />
          }
	  
          <Notification />
	  
          {this.props.user === null
            ? <Switch>
                <Route path='/login' render={() =>
                  <LoginForm />
                } />
                <Redirect from='/' to='/login' />
              </Switch>
            : <Switch>
                <Redirect from='/login' to='/blogs' />
                <Redirect exact from='/' to='/blogs' />
		
                <Route exact path='/blogs' render={() =>
                  <BlogsForm />
                } />
		
                <Route exact path='/blogs/:id' render={({ match, history }) =>
                  <Blog
                    blogId = {match.params.id}
                    history = {history} />
                } />
              </Switch>
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    users: state.users,
    login: state.login,
    blogs: state.blogs
  }
}

const ConnectedApp = connect(
  mapStateToProps, { notify, initializeUsers, login, logout, initializeCredentials, initializeBlogs }
)(App)

export default ConnectedApp