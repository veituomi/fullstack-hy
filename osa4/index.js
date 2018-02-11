const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())

app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		JSON.stringify(req.body),
		tokens.status(req, res),
		tokens['response-time'](req, res), ' ms'
	].join(' ')
}))

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.logger)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
	mongoose.connection.close()
})

module.exports = {
	app, server
}
