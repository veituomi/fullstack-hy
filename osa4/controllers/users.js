const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const required = ['username', 'password', 'name', 'adult']

	const errors = required
		.filter(field => request.body[field] == undefined)
		.map(field => `Required field ${field} is missing.`)

	if (errors.length > 0) {
		return response.status(400).json(errors)
	}

	const { username, password, name, adult} = request.body
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
