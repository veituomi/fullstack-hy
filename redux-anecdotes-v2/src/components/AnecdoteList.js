import React from 'react';
import { actionForAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';

class AnecdoteList extends React.Component {
	render() {
		const filterText = this.props.store.getState().filter.text;
		const filterMinVotes = this.props.store.getState().filter.minVotes;
		const anecdotes = this.props.store.getState().anecdotes
			.filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
			.filter(a => a.votes >= filterMinVotes)
			.sort((a, b) => b.votes - a.votes);
		return (
			<div>
				<h2>Anecdotes</h2>
				<Filter store={this.props.store}></Filter>
				{anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() =>
								this.props.store.dispatch(actionForAnecdote.vote(anecdote))
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

export default AnecdoteList;
