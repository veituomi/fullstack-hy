const filterAtStart = {
	text: '',
	minVotes: 0
};

export const actionForFilter = {
	setText(content) {
		return {
			type: 'SET_FILTER_TEXT',
			content
		};
	},

	setMinVotes(min) {
		return {
			type: 'SET_FILTER_VOTES',
			min
		};
	},

	clear() {
		return {
			type: 'CLEAR_FILTER'
		};
	}
};

const initialState = filterAtStart;

const reducer = (store = initialState, action) => {
	if (action.type === 'CLEAR_FILTER') {
		return initialState;
	}
	if (action.type === 'SET_FILTER_TEXT') {
		return {
			...store,
			text: action.content
		};
	}
	if (action.type === 'SET_FILTER_VOTES') {
		if (action.min !== undefined) {
			return {
				...store,
				minVotes: action.min
			};
		}
	}

	return store;
};

export default reducer;
