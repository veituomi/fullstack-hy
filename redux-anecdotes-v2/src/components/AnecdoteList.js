import React from 'react';
import { connect } from 'react-redux';
import { actionForAnecdote } from '../reducers/anecdoteReducer';
import { actionForNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

class AnecdoteList extends React.Component {
	voteHandler = (anecdote) => {
		this.props.vote(anecdote);
		this.props.notify(`you voted ${anecdote.content}`);
	}

	render() {
		return (
			<div>
				<h2>Anecdotes</h2>
				<Filter></Filter>
				{this.props.anecdotesToShow.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() =>
								this.voteHandler(anecdote)
							}>
								vote
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const anecdotesToShow = (anecdotes, filter) => {
	const filterText = filter.text;
	const filterMinVotes = filter.minVotes;
	return anecdotes
		.filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
		.filter(a => a.votes >= filterMinVotes)
		.sort((a, b) => b.votes - a.votes);
};

const mapStateToProps = (state) => {
	return {
		anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
	};
};

export default connect(
	mapStateToProps,
	{
		notify: actionForNotification.notify,
		vote: actionForAnecdote.vote
	}
)(AnecdoteList);
