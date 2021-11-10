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
				sessionStorage.setItem('user', JSON.stringify(others));
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
				sessionStorage.setItem('user', JSON.stringify(others));
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
		sessionStorage.removeItem('user');
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
		blogApi
			.put(`/post/${id}`, postDetails)
			.then((res) => {
				window.location.replace('/post/' + res.data._id);
			})
			.catch((err) => {
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

export function upload(file) {
	return (dispatch) => {
		blogApi
			.post('/upload', file)
			.then((res) => {
				console.log('Url', res.data.url);
				// dispatch({
				// 	type: types.GET_IMAGE_PATH,
				// 	payload: res.data.url
				// })
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function submitPost(newPost) {
	return () => {
		blogApi
			.post('/post', newPost)
			.then((res) => {
				window.location.replace('/post/' + res.data._id);
			})
			.catch((err) => {
				console.log(err);
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
