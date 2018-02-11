const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
	await Blog.remove({})
})

describe('api tests', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('blog can be created', async () => {
		const blog = {
			title: 'C#',
			author: 'Anders Hejlsberg',
			likes: 2423,
			url: 'library'
		}
		await api
			.post('/api/blogs')
			.send(blog)
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

		expect(await helper.blogsInDB())
			.toContainEqual({ ...blog, likes: 0 })
	})

	test('uncomplete blog is not accepted', async () => {
		const blog = {
			url: 'library'
		}

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(400)
	})
})

afterAll(() => {
	server.close()
})
