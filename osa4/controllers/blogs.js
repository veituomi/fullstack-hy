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

module.exports = blogsRouter
