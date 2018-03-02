const notificationsAtStart = [
];

const getId = () => new Date().getTime() * 100 + Math.floor(Math.random() * 100);

const asObject = (notification, id) => {
	return {
		content: notification,
		id
	};
};

export const actionForNotification = {
	notify(content, time = 10) {
		return async (dispatch) => {
			const id = getId();
			dispatch(actionForNotification.create(content, id));
			setTimeout(() => {
				dispatch(actionForNotification.delete(id));
			}, time * 1000);
		};
	},

	create(content, id) {
		return {
			type: 'CREATE_NOTIFICATION',
			content,
			id
		};
	},

	delete(id) {
		return {
			type: 'DESTROY_NOTIFICATION',
			id
		};
	}
};

const initialState = notificationsAtStart.map(asObject);

const reducer = (store = initialState, action) => {
	if (action.type === 'DESTROY_NOTIFICATION') {
		return store.filter(a => a.id !== action.id);
	}
	if (action.type === 'CREATE_NOTIFICATION') {
		return [...store, asObject(action.content, action.id)];
	}

	return store;
};

export default reducer;
