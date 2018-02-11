const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
	await Blog.remove({})
	await User.remove({})

	await api
		.post('/api/users')
		.send({
			username: 'username',
			password: 'password',
			name: 'name'
		})
})

describe('api get tests', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})

describe('api post tests', () => {
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

describe('api delete tests', () => {
	test('blogs can be deleted', async () => {
		const blog = await helper.createBlog({
			title: 'New blog',
			author: 'Linux',
			url: '/dev/null',
			likes: -1
		})

		const blogsBefore = await helper.blogsInDB()

		await api
			.delete(`/api/blogs/${blog._id}`)
			.send()
			.expect(200)

		const blogsAfter = await helper.blogsInDB()

		expect(blogsBefore.length - blogsAfter.length).toBe(1)
	})
})

describe('api put tests', () => {
	test('blogs can be modified', async () => {
		const blog = await helper.createBlog({
			title: 'New blog',
			author: 'Linux',
			url: '/dev/null',
			likes: -1
		})

		await api
			.put(`/api/blogs/${blog._id}`)
			.send({
				...blog,
				likes: 5
			})
			.expect(200)

		const updatedBlog = await helper.getBlog(blog._id)

		expect(updatedBlog.likes).toBe(5)
	})
})

describe('user api post tests', () => {
	test('user can not be created if password is too short', async () => {
		const user = {
			title: 'usernamesomedontknow',
			password: '',
			name: 'User\'s Name'
		}
		await api
			.post('/api/users')
			.send(user)
			.expect(400)
    })

	test('user can not be created if username is taken', async () => {
		const user = {
			title: 'usernamesomedontknow',
			password: '1234',
			name: 'User\'s Name'
        }
        await User.create(user)
		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})
})

afterAll(() => {
	server.close()
})
