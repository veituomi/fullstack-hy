const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.post('/', async (request, response) => {
	if (request.body.author == undefined || request.body.title == undefined) {
		return response.status(400).send()
	}

	try {
		const token = request.token
		const decodedToken = jwt.verify(token, process.env.SECRET)

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'Token is not valid.' })
		}

		const user = await User.findById(decodedToken.id)

		const blog = new Blog({
			likes: 0,
			...request.body,
			user: user._id
		})

		const result = await blog.save()

		user.blogs = user.blogs.concat(result._id)
		await user.save()

		response.status(201).json(result)
	} catch (ex) {
		response.status(500).json({ error: 'Something went wrong.' })
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	try {
		const token = request.token
		const decodedToken = jwt.verify(token, process.env.SECRET)
		const blog = await Blog.findById(request.params.id)
		if (blog == undefined) {
			return response.status(404).json({ error: 'Resource does not exist.' })
		}
		if (blog.user != decodedToken.id) {
			return response.status(403).json({ error: 'Access denied.' })
		}
		await Blog.remove({
			_id: request.params.id
		})
		response.status(200).send()
	} catch (ex) {
		return response.status(500).json({ error: 'Something went wrong.' })
	}
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
