import axios from 'axios';

const url = 'http://localhost:3001/anecdotes';

const getAll = async () => {
	const response = await axios.get(url);
	return response.data;
};

const createNew = async (content) => {
	const response = await axios.post(url, {
		content,
		votes: 0
	});
	return response.data;
};

const remove = async (id) => {
	return await axios.delete(url + '/' + id);
};

const update = async (newObject) => {
	const response = await axios.put(`${url}/${newObject.id}`, newObject);
	return response.data;
};

export default {
	createNew,
	getAll,
	remove,
	update
};
