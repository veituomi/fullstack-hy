import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Blog } from '../Blog';
import Login from '../Login';
import User from '../User';
import NewBlog from '../NewBlog';
import Notifications from '../Notifications';
import * as blogService from '../../services/blogs';
import * as loginService from '../../services/login';
import * as userService from '../../services/users';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: undefined,
			blogs: [],
			users: []
		};
	}

	pushNotification = () => void 0

	subscribeNotifications = (callback) => {
		this.pushNotification = callback;
	}

	componentDidMount() {
		const user = loginService.getUser();
		if (user) {
			this.setState({ user });
		}
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => b.likes - a.likes);
			this.setState({ blogs });
		});
		userService.getAll().then(users => {
			this.setState({ users });
		});
	}

	setUser = (user) => {
		loginService.setUser(user);
		if (!user) {
			loginService.logout();
			this.pushNotification({
				content: 'Logged out!'
			});
		}
		this.setState({ user });
	}

	navbar = () => {
		return (
			<div>
				<Link to="/blogs">blogs</Link>&nbsp;
				<Link to="/blogs/new">new blog</Link>&nbsp;
				<Link to="/users">users</Link>&nbsp;
			</div>
		);
	}

	selectContent = () => {
		if (!this.state.user) {
			return (
				<Login handler={this.setUser} pushNotification={this.pushNotification}></Login>
			);
		}
		return (
			<div>
				<button onClick={() => this.setUser()}>logout</button>
				<Router>
					<div>
						{this.navbar()}
						<Route exact path="/blogs/new" render={() =>
							<NewBlog pushNotification={this.pushNotification}></NewBlog>
						} />
						<Route exact path="/blogs" render={() =>
							<div>
								<h1>blogs</h1>
								{this.state.blogs.map(blog =>
									<Blog key={blog._id} blog={blog} pushNotification={this.pushNotification}/>
								)}
							</div>
						} />
						<Route exact path="/users" render={() =>
							<div>
								<h1>users</h1>
								<table>
									<thead>
										<tr>
											<th>name</th>
											<th>username</th>
											<th>blogs added</th>
										</tr>
									</thead>
									<tbody>
										{this.state.users.map(user => {
											const url = `/users/${user.id}`;
											return <tr key={user.id}>
												<td>
													<Link to={url}>{user.name}</Link>
												</td>
												<td>{user.username}</td>
												<td>{user.blogs.length}</td>
											</tr>;
										})}
									</tbody>
								</table>
							</div>
						} />
						<Route path="/users/:id" render={({match}) => {
							const user = this.state.users
								.filter(u => u.id === match.params.id)[0];
							if (user) {
								return <User user={user} />;
							}
							return <div>Hold on. Loading data...</div>;
						}} />
					</div>
				</Router>
			</div>
		);
	}

	render() {
		return (
			<div>
				<Notifications subscribe={this.subscribeNotifications}></Notifications>
				{this.selectContent()}
			</div>
		);
		
	}
}

export default App;
