const notificationsAtStart = [
	'Debugging started',
	'Start hacking'
];

const getId = () => new Date().getTime();

const asObject = (notification) => {
	return {
		content: notification,
		time: getId()
	};
};

export const actionForNotification = {
	create(content) {
		return {
			type: 'CREATE_NOTIFICATION',
			content
		};
	},

	deleteOld() {
		return {
			type: 'DESTROY_NOTIFICATION',
			time: new Date().getTime()
		};
	}
};

const initialState = notificationsAtStart.map(asObject);

const reducer = (store = initialState, action) => {
	if (action.type === 'DESTROY_NOTIFICATION') {
		const other = store.filter(a => a.time > action.time - 5000);

		return [...other];
	}
	if (action.type === 'CREATE_NOTIFICATION') {
		return [...store, asObject(action.content)];
	}

	return store;
};

export default reducer;
