const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    try {
        const passwordCorrect = user === null ?
            false :
            await bcrypt.compare(body.password, user.passhash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({ error: 'Invalid username or password.' })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        response.status(200).json({
            token,
            username: user.username,
            name: user.name
        })
    } catch (ex) {
        response.status(500).json({ error: 'Something went wrong.' })
    }
})

module.exports = loginRouter
