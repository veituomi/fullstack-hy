const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

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
})

afterAll(() => {
	server.close()
})
