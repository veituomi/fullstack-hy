const notificationsAtStart = [
	'Debugging started',
	'Start hacking'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (notification) => {
	return {
		content: notification,
		id: getId()
	};
};

export const actionFor = {
	notificationCreation(content) {
		return {
			type: 'CREATE_NOTIFICATION',
			content
		};
	},

	notificationDeletion(notification) {
		return {
			type: 'DESTROY_NOTIFICATION',
			id: notification.id
		};
	}
};

const initialState = notificationsAtStart.map(asObject);

const reducer = (store = initialState, action) => {
	if (action.type === 'DESTROY_NOTIFICATION') {
		const other = store.filter(a => a.id !== action.id);

		return [...other];
	}
	if (action.type === 'CREATE_NOTIFICATION') {
		return [...store, asObject(action.content)];
	}

	return store;
};

export default reducer;
