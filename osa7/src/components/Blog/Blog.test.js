import React from 'react'
import { shallow } from 'enzyme'
import { Blog } from './Blog'

describe.only('<Blog />', () => {
	const blog = {
		title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
		author: 'Matti',
		likes: 667,
		url: 'https://fullstack-hy.github.io/osa5/'
	}

	it('after clicking name the details are displayed', () => {
		const blogComponent = shallow(<Blog blog={blog} />)

		expect(blogComponent.text()).toContain(blog.author)
		expect(blogComponent.text()).not.toContain(blog.likes)

		const nameContainer = blogComponent.find('h2')
		nameContainer.simulate('click')

		const detailsDiv = blogComponent.find('.blogDetails')
		expect(detailsDiv.text()).toContain(blog.url)
		expect(detailsDiv.text()).toContain(blog.likes)
	})
})
