const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

if ( process.env.NODE_ENV !== 'production' ) {
	require('dotenv').config()
}

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

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/blogs', blogsRouter)

app.use(middleware.logger)
app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
