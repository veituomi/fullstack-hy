import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/login/';

export const login = (username, password) => {
	const request = axios.post(baseUrl, { username, password })
		.catch(() => void 0);
	return request.then(response => {
		if (response) return response.data;
		return void 0;
	});
};

export const logout = () => {
	localStorage.removeItem('user');
};

export const setUser = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};
