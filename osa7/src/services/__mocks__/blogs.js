const blogs = [
	{
		_id: 1,
		author: 'Matti',
		title: 'Matti & Teppo',
		likes: 0,
		url: ''
	},
	{
		_id: 2,
		author: 'Teppo',
		title: 'Teppo & Matti',
		likes: 1,
		url: ''
	}
];

export const getAll = () => Promise.resolve(blogs);
