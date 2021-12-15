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
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(others));
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
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(others));
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
		localStorage.removeItem('token');
		localStorage.removeItem('user');
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

export function toggleLike(id) {
	return () => {
		blogApi
			.put('/api/posts/like', id)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function annonLikeToggle(annonData) {
	return () => {
		blogApi
			.put('/api/posts/like/annon', annonData)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function toggleDislike(id) {
	return () => {
		blogApi
			.put('/api/posts/dislike', id)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function annonDislikeToggle(annonData) {
	return () => {
		blogApi
			.put('/api/posts/dislike/annon', annonData)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
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

export function submitComment(commentData) {
	return () => {
		blogApi
			.post('/api/comments', commentData)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function updateComment(id, commentData) {
	return () => {
		blogApi
			.put(`/api/comments/${id}`, commentData)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function deleteComment(commentId) {
	return () => {
		blogApi
			.delete(`/api/comments/${commentId}`)
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function uploadProfilePhoto(file) {
	return (dispatch) => {
		dispatch({
			type: types.PROFILE_PHOTO_UPLOAD_START,
		});
		blogApi
			.put(`profilephoto-upload`, file)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				dispatch({
					type: types.PROFILE_PHOTO_UPLOAD_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.PROFILE_PHOTO_UPLOAD_FAILURE,
				});
			});
	};
}

export function followUser(userToFollow) {
	const userData = {
		followId: userToFollow,
	};
	return (dispatch) => {
		dispatch({
			type: types.FOLLOW_USER_START,
		});
		blogApi
			.put('/api/users/follow', userData)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				dispatch({
					type: types.FOLLOW_USER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.FOLLOW_USER_FAILURE,
					payload: err,
				});
			});
	};
}

export function unfollowUser(userToUnfollow) {
	const userData = {
		unfollowId: userToUnfollow,
	};
	return (dispatch) => {
		dispatch({
			type: types.UNFOLLOW_USER_START,
		});
		blogApi
			.put('api/users/unfollow', userData)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				dispatch({
					type: types.UNFOLLOW_USER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.UNFOLLOW_USER_FAILURE,
					payload: err,
				});
			});
	};
}

export function sendEmail(emailData) {
	return (dispatch) => {
		dispatch({
			type: types.SEND_EMAIL_START,
		});
		blogApi
			.post('/api/email', emailData)
			.then((res) => {
				dispatch({
					type: types.SEND_EMAIL_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.SEND_EMAIL_FAILURE,
					payload: err,
				});
			});
	};
}

export function generateAcctVerificationToken() {
	return (dispatch) => {
		dispatch({
			type: types.GENERATE_VERIFICATION_TOKEN_START,
		});
		blogApi
			.post('/api/users/send-verification-request')
			.then((res) => {
				dispatch({
					type: types.GENERATE_VERIFICATION_TOKEN_SUCCESS,
					payload: res.data,
				});
				alert('Verification Email Sent, Please Check Your Inbox');
			})
			.catch((err) => {
				dispatch({
					type: types.GET_CATEGORIES_FAILURE,
					payload: err,
				});
			});
	};
}

export function verifyAccount(verificationToken) {
	return (dispatch) => {
		dispatch({
			type: types.VERIFY_ACCOUNT_START,
		});
		blogApi
			.put('/api/users/verify-account', verificationToken)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data));
				dispatch({
					type: types.VERIFY_ACCOUNT_SUCCESS,
					payload: res.data,
				});
				window.location.replace('/');
			})
			.catch((err) => {
				dispatch({
					type: types.VERIFY_ACCOUNT_FAILURE,
					payload: err,
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
