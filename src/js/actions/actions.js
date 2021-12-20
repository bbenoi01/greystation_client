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
					payload: err.response.data,
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
					payload: err.response.data,
				});
			});
	};
}

export function logout() {
	return (dispatch) => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		sessionStorage.removeItem('profile');
		sessionStorage.removeItem('post');
		sessionStorage.removeItem('authors');
		dispatch({
			type: types.LOGOUT,
		});
	};
}

export function getUserProfile(path) {
	return (dispatch) => {
		dispatch({
			type: types.GET_USER_PROFILE_START,
		});
		blogApi
			.get(`/api/users/profile/${path}`)
			.then((res) => {
				sessionStorage.setItem('profile', JSON.stringify(res.data));
				dispatch({
					type: types.GET_USER_PROFILE_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_USER_PROFILE_FAILURE,
					payload: err.response.data,
				});
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
				sessionStorage.setItem('posts', JSON.stringify(res.data));
				dispatch({
					type: types.GET_POSTS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_POSTS_FAILURE,
					payload: err.response.data,
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
				sessionStorage.setItem('post', JSON.stringify(res.data));
				dispatch({
					type: types.GET_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_POST_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function toggleLike(id) {
	return (dispatch) => {
		dispatch({
			type: types.LIKE_POST_START,
		});
		blogApi
			.put('/api/posts/like', id)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data.post));
				sessionStorage.setItem('posts', JSON.stringify(res.data.posts));
				dispatch({
					type: types.LIKE_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LIKE_POST_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function annonLikeToggle(annonData) {
	return (dispatch) => {
		dispatch({
			type: types.LIKE_POST_START,
		});
		blogApi
			.put('/api/posts/like/annon', annonData)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data.post));
				sessionStorage.setItem('posts', JSON.stringify(res.data.posts));
				dispatch({
					type: types.LIKE_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LIKE_POST_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function toggleDislike(id) {
	return (dispatch) => {
		dispatch({
			type: types.DISLIKE_POST_START,
		});
		blogApi
			.put('/api/posts/dislike', id)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data.post));
				sessionStorage.setItem('posts', JSON.stringify(res.data.posts));
				dispatch({
					type: types.DISLIKE_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DISLIKE_POST_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function annonDislikeToggle(annonData) {
	return (dispatch) => {
		dispatch({
			type: types.DISLIKE_POST_START,
		});
		blogApi
			.put('/api/posts/dislike/annon', annonData)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data.post));
				sessionStorage.setItem('posts', JSON.stringify(res.data.posts));
				dispatch({
					type: types.DISLIKE_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DISLIKE_POST_FAILURE,
					payload: err.response.data,
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
					payload: err.response.data,
				});
			});
	};
}

export function updatePost(id, postDetails) {
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_POST_START,
		});
		blogApi
			.put(`/api/posts/${id}`, postDetails)
			.then((res) => {
				dispatch({
					type: types.UPDATE_POST_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.UPDATE_POST_FAILURE,
					payload: err.response.data,
				});
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
					payload: err.response.data,
				});
			});
	};
}

export function addCategory(category) {
	return (dispatch) => {
		dispatch({
			type: types.ADD_CATEGORY_START,
		});
		blogApi
			.post('/api/category', category)
			.then((res) => {
				sessionStorage.setItem('categories', JSON.stringify(res.data));
				dispatch({
					type: types.ADD_CATEGORY_SUCCESS,
					payload: res.data,
				});
				alert('Category Added!');
			})
			.catch((err) => {
				dispatch({
					type: types.ADD_CATEGORY_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function deleteCategory(id) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_CATEGORY_START,
		});
		blogApi
			.delete(`/api/category/${id}`)
			.then((res) => {
				sessionStorage.setItem('categories', JSON.stringify(res.data));
				dispatch({
					type: types.DELETE_CATEGORY_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_CATEGORY_FAILURE,
					payload: err.response.data,
				});
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
				sessionStorage.setItem('post', JSON.stringify(res.data));
				dispatch({
					type: types.SUBMIT_POST_SUCCESS,
					payload: res.data,
				});
				window.location.replace('/post/' + res.data._id);
			})
			.catch((err) => {
				dispatch({
					type: types.SUBMIT_POST_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function submitComment(commentData) {
	return (dispatch) => {
		dispatch({
			type: types.SUBMIT_COMMENT_START,
		});
		blogApi
			.post('/api/comments', commentData)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data));
				dispatch({
					type: types.SUBMIT_COMMENT_SUCCESS,
					payload: res.data,
				});
				window.location.reload();
			})
			.catch((err) => {
				dispatch({
					type: types.SUBMIT_COMMENT_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function updateComment(id, commentData) {
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_COMMENT_START,
		});
		blogApi
			.put(`/api/comments/${id}`, commentData)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data));
				dispatch({
					type: types.UPDATE_COMMENT_SUCCESS,
					payload: res.data,
				});
				window.location.reload();
			})
			.catch((err) => {
				dispatch({
					type: types.UPDATE_COMMENT_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function deleteComment(commentId) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_COMMENT_START,
		});
		blogApi
			.delete(`/api/comments/${commentId}`)
			.then((res) => {
				sessionStorage.setItem('post', JSON.stringify(res.data));
				dispatch({
					type: types.DELETE_COMMENT_SUCCESS,
					payload: res.data,
				});
				window.location.reload();
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_COMMENT_FAILURE,
					payload: err.response.data,
				});
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
					payload: err.response.data,
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
					payload: err.response.data,
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
					payload: err.response.data,
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
					payload: err.response.data,
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
					payload: err.response.data,
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
					payload: err.response.data,
				});
			});
	};
}

export function getAllAuthors() {
	return (dispatch) => {
		dispatch({
			type: types.GET_AUTHORS_START,
		});
		blogApi
			.get('/api/users')
			.then((res) => {
				sessionStorage.setItem('authors', JSON.stringify(res.data));
				dispatch({
					type: types.GET_AUTHORS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_CATEGORIES_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function blockUser(id) {
	return (dispatch) => {
		dispatch({
			type: types.BLOCK_USER_START,
		});
		blogApi
			.put(`/api/users/block-user/${id}`)
			.then((res) => {
				sessionStorage.setItem('authors', JSON.stringify(res.data));
				dispatch({
					type: types.BLOCK_USER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.BLOCK_USER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function unblockUser(id) {
	return (dispatch) => {
		dispatch({
			type: types.UNBLOCK_USER_START,
		});
		blogApi
			.put(`/api/users/unblock-user/${id}`)
			.then((res) => {
				sessionStorage.setItem('authors', JSON.stringify(res.data));
				dispatch({
					type: types.UNBLOCK_USER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.UNBLOCK_USER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function deleteUser(id) {
	return (dispatch) => {
		dispatch({
			type: types.DELETE_USER_START,
		});
		blogApi
			.delete(`/api/users/${id}`)
			.then((res) => {
				sessionStorage.setItem('authors', JSON.stringify(res.data));
				dispatch({
					type: types.DELETE_USER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.DELETE_USER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function updateUser(id, userData) {
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_USER_START,
		});
		blogApi
			.put(`/api/users/${id}`, userData)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res.data.user));
				dispatch({
					type: types.UPDATE_USER_SUCCESS,
					payload: res.data.user,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.UPDATE_USER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function updateProfile(pid, uid, userData) {
	return (dispatch) => {
		dispatch({
			type: types.UPDATE_PROFILE_START,
		});
		blogApi
			.put(`/api/users/${pid}`, userData)
			.then((res) => {
				if (pid === uid) {
					localStorage.setItem('user', JSON.stringify(res.data.user));
					localStorage.setItem('profile', JSON.stringify(res.data.profile));
					dispatch({
						type: types.UPDATE_USER_AND_PROFILE_SUCCESS,
						payload: res.data,
					});
				} else {
					localStorage.setItem('profile', JSON.stringify(res.data.profile));
					dispatch({
						type: types.UPDATE_PROFILE_SUCCESS,
						payload: res.data.profile,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: types.UPDATE_PROFILE_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
