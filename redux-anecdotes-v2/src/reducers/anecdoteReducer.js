import anecdoteService from '../services/anecdotes';

export const actionForAnecdote = {
	create(content) {
		return async(dispatch) => {
			const anecdote = await anecdoteService.createNew(content);
			dispatch({
				type: 'CREATE_ANECDOTE',
				content: anecdote
			});
		};
	},

	initialize() {
		return async (dispatch) => {
			const anecdotes = await anecdoteService.getAll();
			dispatch({
				type: 'INITIALIZE_ANECDOTES',
				anecdotes
			});
		};
	},

	vote(anecdote) {
		return async (dispatch) => {
			const updated = await anecdoteService.update({
				...anecdote,
				votes: anecdote.votes + 1
			});
			dispatch({
				type: 'VOTE_ANECDOTE',
				anecdote: updated
			});
		};
	}
};

const initialState = [];

const reducer = (store = initialState, action) => {
	if (action.type === 'VOTE_ANECDOTE') {
		const old = store.filter(a => a.id !== action.anecdote.id);
		return [...old, action.anecdote];
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
