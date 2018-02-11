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

const createBlog = async ({ title, author, url, likes }) => {
    const blog = new Blog({
        title,
        author,
        url,
        likes
	})

	return await blog.save()
}

const getBlog = async (id) => {
    return await Blog.findOne({ _id: id })
}

module.exports = {
    blogsInDB,
    cleanBlog,
    createBlog,
    getBlog
}
