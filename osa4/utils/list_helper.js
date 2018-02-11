const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs
		.map(blog => blog.likes)
		.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length <= 1) {
		return blogs[0]
	}
	return blogs
		.reduce((a, b) => a.likes > b.likes ? a : b)
}

const mostBlogs = (blogs) => {
	const blogsByAuthor = []

	if (blogs.length == 0) {
		return undefined
	}

	blogs.forEach(blog => {
		blogsByAuthor[blog.author] || (blogsByAuthor[blog.author] = 0)
		blogsByAuthor[blog.author] += 1
	});

	let author;
	for (const name in blogsByAuthor) {
		if (author == undefined || blogsByAuthor[name] > blogsByAuthor[author]) {
			author = name
		}
	}

	return ({
		author,
		blogs: blogsByAuthor[author]
	})
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
