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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
