import React from 'react'
import { shallow } from 'enzyme'
import Blog from './SimpleBlog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      author: 'admin',
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      url: 'http://www.test.com',
      likes: 1
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const contentDiv2 = blogComponent.find('.content2')

    const context = blog.title + ' ' + blog.author
    const context2 = 'blog has ' + blog.likes + ' likes'

    expect(contentDiv.text()).toContain(context)
    expect(contentDiv2.text()).toContain(context2)
  })
  
  it('clicking the button twice calls event handler twice', () => {
    const blog = {
      author: 'admin',
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      url: 'http://www.test.com',
      likes: 0
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})