import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as blogService from '../../services/blogs';
import * as loginService from '../../services/login';

export class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hide: false,
			expand: props.expand,
			style: undefined,
			likes: props.blog.likes
		};
	}

	selectedStyle = {
		border: '1px solid black'
	}

	like = (amount = 1) => {
		const likes = this.state.likes + amount;
		blogService
			.update({
				...this.props.blog,
				likes
			})
			.then(() => {
				this.setState({ likes });
			});
	}

	confirmRemove = () => {
		this.props.pushNotification({
			content: `Are you sure you want to delete ${this.props.blog.title}`,
			buttons: [
				{
					label: 'Yes',
					callback: () => this.remove()
				},
				{
					label: 'No',
					callback: () => void 0
				},
				{
					label: 'Ask me later',
					callback: () => setTimeout(() => this.confirmRemove(), 10000)
				}
			]
		});
	}

	remove = () => {
		blogService
			.remove(this.props.blog)
			.then(status => {
				if (status === 200) {
					this.setState({ hide: true });
					this.props.pushNotification({ content: `Deleted ${this.props.blog.title}.` });
				} else {
					this.props.pushNotification({ content: 'Failed to delete!' });
				}
			});
	}

	deleteButton = () => {
		if (!loginService.getUser() ||
				this.props.blog.user !== loginService.getUser().id ||
				!this.props.blog.user) {
			return;
		}
		return <button onClick={this.confirmRemove}>delete</button>;
	}

	expanded = () => {
		if (this.state.expand) {
			return (
				<div className="blogDetails">
					url: {this.props.blog.url}<br/>
					{this.state.likes} likes
					{this.deleteButton()}
					<button onClick={() => this.like(1)}>like</button>
					<button onClick={() => this.like(-1)}>dislike</button>
				</div>
			);
		}
	}

	render() {
		if (this.state.hide) {
			return <div style={{ display: 'none' }}>Hidden item</div>;
		}
		if (this.state.expand) {
			return (
				<div style={this.state.style} className="blogElement">
					<h2>{this.props.blog.title}</h2>
					author: {this.props.blog.author}<br/>
					{this.expanded()}
				</div>
			);
		}
		const url = `/blogs/${this.props.blog._id}`;
		return (
			<div style={this.state.style} className="blogElement">
				<Link to={url}>
					<h2>{this.props.blog.title}</h2>
				</Link>
			</div>
		);
	}
}

Blog.propTypes = {
	expand: PropTypes.bool.isRequired,
	blog: PropTypes.any.isRequired,
	pushNotification: PropTypes.func
};
