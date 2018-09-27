const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    if (body.title === undefined) {
      if (body.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
      }
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes,
			user: user._id
		})

    const result = await blog.save()
  
    user.blogs = user.blogs.concat(result._id)
    await user.save()
  
    const formated = Blog.format(result)
    response.status(201).json(formated)
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userId = blog.user.toString()

    if (userId !== decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)

    const user = await User.findById(userId)
    
    user.blogs = await user.blogs.filter(b => b.id.toString() !== blog.id.toString())
    await user.save()

    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(400).send({ error: 'malformatted id' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  try {
    const original = await Blog.findById(request.params.id)
    
    const updateBlog = {
	title: original.title,
	author: original.author,
	url: original.url,
	likes: body.likes === undefined ? original.likes : body.likes,
	user: original.user
    }
    
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