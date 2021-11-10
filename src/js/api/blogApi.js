import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://test-greystation-api.herokuapp.com',
});

instance.interceptors.request.use(
	async (config) => {
		const token = await sessionStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
