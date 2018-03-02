import React from 'react';
import { actionForFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
	handleTextChange = (e) => {
		const content = e.target.value;
		this.props.store.dispatch(actionForFilter.setText(content));
	}

	handleVotesChange = (e) => {
		const min = parseInt(e.target.value) || 0;
		this.props.store.dispatch(actionForFilter.setMinVotes(min));
	}
	render() {
		return (
			<div>
				<div>
					filter
					<input onChange={this.handleTextChange} name="filter_text" />
				</div>
				<div>
					min votes
					<input onChange={this.handleVotesChange} name="filter_min" />
				</div>
			</div>
		);
	}
}

export default Filter;
