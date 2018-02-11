const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })
	response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
	const { username, password, name, adult } = { adult: true, ...request.body}

	const required = ['username', 'password', 'name']

	const errors = required
		.filter(field => request.body[field] == undefined)
		.map(field => `Required field ${field} is missing.`)

	const existingUsers = await User.find({ username })
	if (existingUsers.length > 0) {
		errors.push(`Username ${username} is already taken.`)
	}

	if (password.length < 3) {
		errors.push(`Password is too short.`)
	}

	if (errors.length > 0) {
		return response.status(400).json(errors)
	}

	const passhash = await bcrypt.hash(password, config.passwordSaltRounds)

	const user = new User({
		username,
		passhash,
		name,
		adult
	})

	const result = await user.save()
	response.status(201).json(result)
})

module.exports = usersRouter
