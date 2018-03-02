import React from 'react'

export const SimpleBlog = ({ blog, onClick }) => (
	<div className="content">
		<div>
			{blog.title} {blog.author}
		</div>
		<div>
			blog has {blog.likes} likes
			<button onClick={onClick}>like</button>
		</div>
	</div>
)
