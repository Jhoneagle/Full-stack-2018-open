import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  
  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })
    
    it('renders only login form', () => {
      app.update()
      const content = app.find(".content")
      const shouldBe = 'Kirjaudukäyttäjätunnus:salasana:kirjaudu'
    
      expect(content.text()).toEqual(shouldBe)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      
      const content = app.find(Blog)
      expect(content.length).toEqual(blogService.blogs.length)
    })
  })
})