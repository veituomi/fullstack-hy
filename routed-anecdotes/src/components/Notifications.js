import React from 'react'

const defaultStyle = {
	border: '2px solid black',
	borderRadius: '10px',
	padding: '8px',
	background: 'orange',
}

class Notifications extends React.Component {
	constructor(props) {
		super(props)
		props.subscribe(this.push)
		this.state = {
			notifications: []
		}
	}

	push = (notification) => {
		this.setState({
			notifications: [...this.state.notifications, notification]
		})
		setTimeout(this.pop, 10000)
	}

	pop = () => {
		const notifications = this.state.notifications
		notifications.shift()
		this.setState({
			notifications
		})
	}

	render() {
		return (
			<div>
				{this.state.notifications
					.filter(notification => !notification.dismissed)
					.slice(0, 4)
					.map(notification => (
						<div style={{
							...defaultStyle,
							...notification.style,
						}}>{notification.content}
						{(notification.buttons || []).map(button =>
							<button onClick={() => {
									notification.dismissed = true
									this.setState({ notifications: this.state.notifications })
									button.callback() }}
								style={{
									...notification.buttonStyle,
									...button.style}}>
								{button.label}
							</button>
						)}
						</div>
					))}
			</div>
		)
	}
}

export default Notifications
