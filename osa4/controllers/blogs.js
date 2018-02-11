const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
	if (request.body.author == undefined || request.body.title == undefined) {
		return response.status(400).send()
	}

	const user = await User.findOne({})

	const blog = new Blog({
		likes: 0,
		...request.body,
		user: user._id
	})

	const result = await blog.save()

	user.blogs = user.blogs.concat(result._id)
	await user.save()

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
