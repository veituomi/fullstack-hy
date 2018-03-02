import React from 'react';
import { connect } from 'react-redux';

class Notification extends React.Component {
	render() {
		const style = {
			border: 'solid',
			padding: 10,
			borderWidth: 1
		};
		return (
			<div style={style}>
				{this.props.notifications.map(
					notification => <div key={notification.id}>{notification.content}</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notifications: state.notifications
	};
};

export default connect(
	mapStateToProps,
	{
	}
)(Notification);
