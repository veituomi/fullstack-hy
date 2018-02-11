const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	if (request.body.author == undefined || request.body.title == undefined) {
		return response.status(400).send()
	}

	const blog = new Blog({
		likes: 0,
		...request.body
	})

	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.remove({
		_id: request.params.id
	})
	response.status(200).send()
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body
	await Blog.update({
		_id: request.params.id
	},
	new Blog({
		_id: request.params.id,
		...blog
	}))
	response.status(200).send()
})

module.exports = blogsRouter
