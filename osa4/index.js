const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
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

app.use('/api/blogs', blogsRouter)

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
