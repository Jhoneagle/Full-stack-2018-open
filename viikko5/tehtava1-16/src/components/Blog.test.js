import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders content and full detail', () => {
    const admin = {
      id: 12,
      username: 'admin',
      name: 'testman'
    }
    const blog = {
      author: 'admin',
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      url: 'http://www.test.com',
      likes: 1,
      user: admin
    }
    
    const delHandler = jest.fn()
    const likeHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
	blog={blog} 
	user={admin}
	update={likeHandler}
        del={delHandler}
      />
    )

    const nameDiv = blogComponent.find('.name')
    nameDiv.simulate('click')

    const contentDiv = blogComponent.find('.content')

    const nameText = blog.title + ' ' + blog.author
    const contextText = nameText + blog.url + blog.likes + ' likes ' + 'like' + 'added by ' + admin.username

    expect(nameDiv.text()).toEqual(nameText)
    expect(contentDiv.text()).toEqual(contextText)
  })
})