import { createStore, combineReducers  } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	filter: filterReducer,
	notifications: notificationReducer,
});

const store = createStore(reducer);

export default store;
