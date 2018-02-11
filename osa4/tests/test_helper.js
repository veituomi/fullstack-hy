const Blog = require('../models/blog')

const cleanBlog = ({ title, author, url, likes }) => ({
	title,
	author,
	url,
	likes
})

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(cleanBlog)
}

module.exports = {
    cleanBlog,
    blogsInDB
}
