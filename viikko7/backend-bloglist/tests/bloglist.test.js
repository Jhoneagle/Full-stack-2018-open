const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('returning blogs with GET', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('blogs are returned as json by GET', async () => {
    const blogsInDatabase = await helper.blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })
  
  test('individual blogs are returned as json by GET', async () => {
    const blogsInDatabase = await helper.blogsInDbWithId()
    const aBlog = blogsInDatabase[0]

    const response = await api
      .get(`/api/blogs/${aBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(aBlog.title)
  })

  test('404 returned by GET with nonexisting valid id', async () => {
    const validNonexistingId = await helper.nonExistingId()

    const response = await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('400 is returned by GET with invalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Adding blogs  with POST', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Peace And War',
      author: 'Wiseman',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 100
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual(newBlog)
  })

  test('no likes given', async () => {
    const newBlog = {
      title: 'Last dinner',
      author: 'Jeesus',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    const thumps = blogsAfter.map(r => r.likes)

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(thumps).toContain(0)
  })

  test('no title or url given', async () => {
    const newBlog = {
      author: 'Wiseman',
      likes: 100
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

describe('Deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'Will be get away',
      author: 'Will be get away',
      url: 'http:\\www.troll.com',
      likes: 1
    })
      
    await addedBlog.save()
  })

  test('Deletion succeeds with proper statuscode', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await helper.blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
  
  test('Deletion fails with proper statuscode', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = "5a3d5da59070081a82a3445"

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAfterOperation = await helper.blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
  })
})

describe('Updateing blog with PUT', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })
  
  test('a blog can be uptaded successfully', async () => {
    const updatedBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 100
    }

    const blogsBefore = await helper.blogsInDbWithId()
    const id = blogsBefore[0].id

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter[0]).toEqual(updatedBlog)
  })
  
  test('update failed with unvalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter[0]).not.toEqual(newBlog)
  })
})

afterAll(() => {
  server.close()
})
