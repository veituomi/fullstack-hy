import anecdoteService from '../services/anecdotes';

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

const initialState = [];

const reducer = (store = initialState, action) => {
	if (action.type === 'VOTE_ANECDOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		const updated = {
			...voted,
			votes: voted.votes + 1
		};

		anecdoteService.update(updated);

		return [...old, updated];
	}
	if (action.type === 'CREATE_ANECDOTE') {
		return [...store, action.content ];
	}
	if (action.type === 'INITIALIZE_ANECDOTES') {
		return [ ...action.anecdotes ];
	}

	return store;
};

export default reducer;
