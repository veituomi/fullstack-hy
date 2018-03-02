import React from 'react'
import { Blog } from '../Blog'
import Login from '../Login'
import NewBlog from '../NewBlog'
import Notifications from '../Notifications'
import * as blogService from '../../services/blogs'
import * as loginService from '../../services/login'

export class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: undefined,
			blogs: []
		}
	}

	pushNotification = () => void 0

	subscribeNotifications = (callback) => {
		this.pushNotification = callback
	}

	componentDidMount() {
		const user = loginService.getUser()
		if (user) {
			this.setState({ user })
		}
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => b.likes - a.likes)
			this.setState({ blogs })
		})
	}

	setUser = (user) => {
		loginService.setUser(user)
		if (!user) {
			loginService.logout()
			this.pushNotification({
				content: 'Logged out!'
			})
		}
		this.setState({ user })
	}

	selectContent = () => {
		if (!this.state.user) {
			return (
				<Login handler={this.setUser} pushNotification={this.pushNotification}></Login>
			)
		}
		return (
			<div>
				<button onClick={() => this.setUser()}>logout</button>
				<NewBlog pushNotification={this.pushNotification}></NewBlog>
				<h1>blogs</h1>
				{this.state.blogs.map(blog =>
					<Blog key={blog._id} blog={blog} pushNotification={this.pushNotification}/>
				)}
			</div>
		)
	}

	render() {
		return (
			<div>
				<Notifications subscribe={this.subscribeNotifications}></Notifications>
				{this.selectContent()}
			</div>
		)
		
	}
}

export default App;
