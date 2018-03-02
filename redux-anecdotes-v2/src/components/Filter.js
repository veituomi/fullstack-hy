import React from 'react';
import { connect } from 'react-redux';
import { actionForFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
	handleTextChange = (e) => {
		const content = e.target.value;
		this.props.setText(content);
	}

	handleVotesChange = (e) => {
		const min = parseInt(e.target.value, 10) || 0;
		this.props.setMinVotes(min);
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
				<button onClick={this.clearFilter}>clear</button>
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
		setMinVotes: actionForFilter.setMinVotes,
		setText: actionForFilter.setText
	}
)(Filter);
