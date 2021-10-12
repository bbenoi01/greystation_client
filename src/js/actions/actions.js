import { types } from '../types';
import blogApi from '../api/blogApi';

export function register(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		blogApi
			.post('/signup', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data;
				sessionStorage.setItem('token', res.data.token);
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: others,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LOGIN_FAILURE,
				});
			});
	};
}

export function login(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		blogApi
			.post('/signin', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data;
				sessionStorage.setItem('token', res.data.token);
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: others,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LOGIN_FAILURE,
				});
			});
	};
}

export function logout() {
	return (dispatch) => {
		sessionStorage.removeItem('token');
		dispatch({
			type: types.LOGOUT,
		});
	};
}

export function getPosts(search) {
	return (dispatch) => {
		dispatch({
			type: types.GET_POSTS_START,
		});
		blogApi
			.get('/posts' + search)
			.then((res) => {
				dispatch({
					type: types.GET_POSTS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_POSTS_FAILURE,
				});
			});
	};
}

export function getPost(path) {
	return (dispatch) => {
		dispatch({
			type: types.GET_POST_START,
		});
		blogApi
			.get('/post/' + path)
			.then((res) => {
				dispatch({
					type: types.GET_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_POST_FAILURE,
				});
			});
	};
}

export function deletePost(id) {
	return () => {
		blogApi
			.delete(`/post/${id}`)
			.then((res) => {
				window.location.replace('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function updatePost(id, postDetails) {
	return () => {
		blogApi.put(`/post/${id}`, postDetails).catch((err) => {
			console.log(err);
		});
	};
}

export function getCategories() {
	return (dispatch) => {
		dispatch({
			type: types.GET_CATEGORIES_START,
		});
		blogApi
			.get('/categories')
			.then((res) => {
				dispatch({
					type: types.GET_CATEGORIES_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_CATEGORIES_FAILURE,
				});
			});
	};
}

export const updateStart = (userCredentials) => ({
	type: types.UPDATE_START,
});

export const updateSuccess = (user) => ({
	type: types.UPDATE_SUCCESS,
	payload: user,
});

export const updateFailure = () => ({
	type: types.UPDATE_FAILURE,
});
