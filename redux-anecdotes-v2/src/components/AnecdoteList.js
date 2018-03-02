import React from 'react';
import { connect } from 'react-redux';
import { actionForAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';

class AnecdoteList extends React.Component {
	render() {
		const filterText = this.props.filter.text;
		const filterMinVotes = this.props.filter.minVotes;
		const anecdotes = this.props.anecdotes
			.filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
			.filter(a => a.votes >= filterMinVotes)
			.sort((a, b) => b.votes - a.votes);
		return (
			<div>
				<h2>Anecdotes</h2>
				<Filter></Filter>
				{anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() =>
								this.props.vote(anecdote)
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter
	};
};

export default connect(
	mapStateToProps,
	{
		vote: actionForAnecdote.vote
	}
)(AnecdoteList);
