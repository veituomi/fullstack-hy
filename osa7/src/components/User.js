import React from 'react';
import PropTypes from 'prop-types';

export class User extends React.Component {
	render() {
		const user = this.props.user;
		return <div>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>
			<ul>
				{user.blogs.map(blog =>
					<li key={blog._id}>
						{blog.title}
					</li>
				)}
			</ul>
		</div>;
	}
}

User.propTypes = {
	user: PropTypes.any.isRequired
};

export default User;
