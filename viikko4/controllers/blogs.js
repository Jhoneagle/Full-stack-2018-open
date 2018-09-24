const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (body.title === undefined) {
    if (body.url === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  }
  
  const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes
		})

  const result = await blog.save()
  const formated = Blog.format(result)
  response.status(201).json(formated)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updateBlog = {
	title: body.title,
	author: body.author,
	url: body.url,
	likes: body.likes
  }
  
  try {
    await Blog
      .findByIdAndUpdate(request.params.id, updateBlog, { new: true } )

    const update = await Blog.findById(request.params.id)

    response.status(200).json(Blog.format(update))
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
   
    if (blog) {
      response.status(200).json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter