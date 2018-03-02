import React from 'react';
import { shallow } from 'enzyme';
import { SimpleBlog } from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
	const blog = {
		title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
		author: 'Matti',
		likes: 667,
		url: 'https://fullstack-hy.github.io/osa5/'
	};

	it('renders content', () => {
		const blogComponent = shallow(<SimpleBlog blog={blog} />);
		const contentDiv = blogComponent.find('.content');

		expect(contentDiv.text()).toContain(blog.author);
		expect(contentDiv.text()).toContain(blog.title);
		expect(contentDiv.text()).toContain(blog.likes);
	});

	it('can be liked', () => {
		const mockHandler = jest.fn();
		const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />);
		const button = blogComponent.find('button');

		const count = 2;
		for (let i = 0; i < count; i += 1) {
			button.simulate('click');
		}

		expect(mockHandler.mock.calls.length).toBe(count);
	});
});
