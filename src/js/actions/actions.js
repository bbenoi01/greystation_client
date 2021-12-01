import { types } from '../types';
import blogApi from '../api/blogApi';

export function register(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		blogApi
			.post('/api/users/register', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data;
				sessionStorage.setItem('token', token);
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
			.post('/api/users/login', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data;
				sessionStorage.setItem('token', token);
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
			.get('/api/posts' + search)
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
			.get('/api/posts/' + path)
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
	return (dispatch) => {
		dispatch({
			type: types.DELETE_POST_START,
		});
		blogApi
			.delete(`/api/posts/${id}`)
			.then((res) => {
				dispatch({
					type: types.DELETE_POST_SUCCESS,
				});
				window.location.replace('/');
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_POST_FAILURE,
					payload: err,
				});
			});
	};
}

export function updatePost(id, postDetails) {
	return () => {
		blogApi
			.put(`/api/posts/${id}`, postDetails)
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
			.get('/api/category')
			.then((res) => {
				sessionStorage.setItem('categories', JSON.stringify(res.data));
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
export function addCategory(category) {
	return (dispatch) => {
		blogApi
			.post('/api/category', category)
			.then((res) => {
				alert('Category Added!');
				dispatch(getCategories());
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function deleteCategory(id) {
	return (dispatch) => {
		blogApi
			.delete(`/api/category/${id}`)
			.then(() => {
				dispatch(getCategories());
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function upload(data) {
	return () => {
		blogApi.post('/upload', data).catch((err) => {
			console.log(err);
		});
	};
}
export function submitPost(newPost) {
	return (dispatch) => {
		dispatch({
			type: types.SUBMIT_POST_START,
		});
		blogApi
			.post('/api/posts', newPost)
			.then((res) => {
				dispatch({
					type: types.SUBMIT_POST_SUCCESS,
					payload: res.data,
				});
				window.location.replace('/post/' + res.data._id);
			})
			.catch((err) => {
				dispatch({
					type: types.SUBMIT_POST_FAILURE,
					payload: err,
				});
			});
	};
}

export function clearLoadedPost() {
	return (dispatch) => {
		dispatch({
			type: types.CLEAR_POST,
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
