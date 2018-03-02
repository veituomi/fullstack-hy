import React from 'react';
import { connect } from 'react-redux';
import { actionForAnecdote } from '../reducers/anecdoteReducer';
import { actionForNotification } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
	handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		await this.props.createAnecdote(content);
		this.props.notify(`you created '${content}'`);
	}

	render() {
		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={this.handleSubmit}>
					<div><input name='anecdote' /></div>
					<button>create</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter
	};
};

export default connect(
	mapStateToProps,
	{
		createAnecdote: actionForAnecdote.create,
		notify: actionForNotification.notify
	}
)(AnecdoteForm);
