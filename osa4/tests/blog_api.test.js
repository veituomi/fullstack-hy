const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const cleanBlog = ({ title, author, url, likes }) => ({
	title,
	author,
	url,
	likes
})

describe('api tests', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('blog can be created', async () => {
		await api
			.post('/api/blogs', {})
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})

	test('created blog has 0 likes if not specified', async () => {
		const blog = {
			title: 'C++',
			author: 'Bjarne Stroustrup',
			url: 'library'
		}

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body.map(blog => cleanBlog(blog)))
			.toContainEqual({ ...blog, likes: 0 })
	})
})

beforeAll(async () => {
	await Blog.remove({})
})

afterAll(() => {
	server.close()
})
