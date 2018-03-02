import React from 'react'
import * as blogService from '../services/blogs'

class NewBlog extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			author: '',
			url: ''
		}
	}

	handleFieldChange = (event) => {
		if (event.target.name === 'title') {
			this.setState({ title: event.target.value })
		} else if (event.target.name === 'author') {
			this.setState({ author: event.target.value })
		} else if (event.target.name === 'url') {
			this.setState({ url: event.target.value })
		}
	}

	create = (event) => {
		event.preventDefault()
		blogService.create({
			title: this.state.title,
			author: this.state.author,
			url: this.state.url
		})
		this.props.pushNotification({
			content: 'New blog created!'
		})
	}

	render() {
		return (
			<div>
				<h1>New blog</h1>
				<form onSubmit={this.create} method="post">
					<div>
						title
						<input
						type="text"
						name="title"
						value={this.state.title}
						onChange={this.handleFieldChange}
						/>
					</div>
					<div>
						author
						<input
						type="text"
						name="author"
						value={this.state.author}
						onChange={this.handleFieldChange}
						/>
					</div>
					<div>
						url
						<input
						type="text"
						name="url"
						value={this.state.url}
						onChange={this.handleFieldChange}
						/>
					</div>
					<button type="submit">create</button>
				</form>
			</div>
		)
	}
}

export default NewBlog
