const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('api tests', () => {
	test('blogs are returned as json', async () => {
		const get = await api.get('/api/blogs')
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})

afterAll(() => {
	server.close()
})
