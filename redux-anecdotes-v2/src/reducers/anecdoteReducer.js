const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	};
};

export const actionForAnecdote = {
	create(content) {
		return {
			type: 'CREATE_ANECDOTE',
			content
		};
	},

	initialize(anecdotes) {
		return {
			type: 'INITIALIZE_ANECDOTES',
			anecdotes
		};
	},

	vote(anecdote) {
		return {
			type: 'VOTE_ANECDOTE',
			id: anecdote.id
		};
	}
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (store = initialState, action) => {
	if (action.type === 'VOTE_ANECDOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		return [...old, { ...voted, votes: voted.votes + 1 }];
	}
	if (action.type === 'CREATE_ANECDOTE') {

		return [...store, asObject(action.content) ];
	}
	if (action.type === 'INITIALIZE_ANECDOTES') {

		return [ ...action.anecdotes ];
	}

	return store;
};

export default reducer;
