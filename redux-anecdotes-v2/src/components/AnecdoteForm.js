import React from 'react';
import { actionForAnecdote } from '../reducers/anecdoteReducer';
import { actionForNotification } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		this.props.store.dispatch(actionForAnecdote.create(content));
		this.props.store.dispatch(actionForNotification.create('Created new anecdote'));
		setTimeout(() => {
			this.props.store.dispatch(actionForNotification.deleteOld());
		}, 5500);

		e.target.anecdote.value = '';
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

export default AnecdoteForm;
