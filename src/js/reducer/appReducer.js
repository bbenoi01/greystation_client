import { types } from '../types';
const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	profile: JSON.parse(sessionStorage.getItem('profile')) || {},
	posts: JSON.parse(sessionStorage.getItem('posts')) || [],
	post: JSON.parse(sessionStorage.getItem('post')) || {},
	categories: JSON.parse(sessionStorage.getItem('categories')) || [],
	authors: JSON.parse(sessionStorage.getItem('authors')) || [],
	loading: false,
	errors: {},
};

const appReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.LOGIN_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.LOGIN_SUCCESS: {
			return {
				...state,
				user: payload,
				loading: false,
				errors: {},
			};
		}

		case types.LOGIN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GET_USER_PROFILE_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_USER_PROFILE_SUCCESS: {
			return {
				...state,
				loading: false,
				profile: payload,
				errors: {},
			};
		}

		case types.GET_USER_PROFILE_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CLEAR_PROFILE: {
			return {
				...state,
				profile: {},
			};
		}

		case types.GET_POSTS_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_POSTS_SUCCESS: {
			return {
				...state,
				posts: payload,
				loading: false,
				errors: {},
			};
		}

		case types.GET_POSTS_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GET_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_POST_SUCCESS: {
			return {
				...state,
				post: payload,
				loading: false,
				errors: {},
			};
		}

		case types.GET_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.LIKE_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.LIKE_POST_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload.post,
				posts: payload.posts,
				errors: {},
			};
		}

		case types.LIKE_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.DISLIKE_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.DISLIKE_POST_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload.post,
				posts: payload.posts,
				errors: {},
			};
		}

		case types.DISLIKE_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CLEAR_POST: {
			return {
				...state,
				post: {},
			};
		}

		case types.SUBMIT_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.SUBMIT_POST_SUCCESS: {
			return {
				...state,
				post: payload,
				loading: false,
				errors: {},
			};
		}

		case types.SUBMIT_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UPDATE_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UPDATE_POST_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload,
				errors: {},
			};
		}

		case types.UPDATE_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.DELETE_POST_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.DELETE_POST_SUCCESS: {
			return {
				...state,
				loading: false,
				errors: {},
			};
		}

		case types.DELETE_POST_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GET_CATEGORIES_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_CATEGORIES_SUCCESS: {
			return {
				...state,
				categories: payload,
				loading: false,
				errors: {},
			};
		}

		case types.GET_CATEGORIES_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.ADD_CATEGORY_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.ADD_CATEGORY_SUCCESS: {
			return {
				...state,
				loading: false,
				categories: payload,
				errors: {},
			};
		}

		case types.ADD_CATEGORY_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.DELETE_CATEGORY_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.DELETE_CATEGORY_SUCCESS: {
			return {
				...state,
				loading: false,
				categories: payload,
				errors: {},
			};
		}

		case types.DELETE_CATEGORY_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.SUBMIT_COMMENT_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.SUBMIT_COMMENT_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload,
				errors: {},
			};
		}

		case types.SUBMIT_COMMENT_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UPDATE_COMMENT_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UPDATE_COMMENT_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload,
				errors: {},
			};
		}

		case types.UPDATE_COMMENT_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.DELETE_COMMENT_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.DELETE_COMMENT_SUCCESS: {
			return {
				...state,
				loading: false,
				post: payload,
				errors: {},
			};
		}

		case types.DELETE_COMMENT_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.FOLLOW_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.FOLLOW_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload,
				errors: {},
			};
		}

		case types.FOLLOW_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UNFOLLOW_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UNFOLLOW_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload,
				errors: {},
			};
		}

		case types.UNFOLLOW_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.SEND_EMAIL_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.SEND_EMAIL_SUCCESS: {
			return {
				...state,
				loading: false,
				errors: {},
			};
		}

		case types.SEND_EMAIL_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GENERATE_VERIFICATION_TOKEN_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GENERATE_VERIFICATION_TOKEN_SUCCESS: {
			return {
				...state,
				loading: false,
				errors: {},
			};
		}

		case types.GENERATE_VERIFICATION_TOKEN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.VERIFY_ACCOUNT_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.VERIFY_ACCOUNT_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload,
				errors: {},
			};
		}

		case types.VERIFY_ACCOUNT_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.PROFILE_PHOTO_UPLOAD_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.PROFILE_PHOTO_UPLOAD_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload.user,
				profile: payload.profile,
				errors: {},
			};
		}

		case types.PROFILE_PHOTO_UPLOAD_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GET_AUTHORS_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_AUTHORS_SUCCESS: {
			return {
				...state,
				loading: false,
				authors: payload,
				errors: {},
			};
		}

		case types.GET_AUTHORS_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.DELETE_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.DELETE_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authors: payload,
				errors: {},
			};
		}

		case types.DELETE_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.BLOCK_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.BLOCK_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authors: payload,
				errors: {},
			};
		}

		case types.BLOCK_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UNBLOCK_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UNBLOCK_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authors: payload,
				errors: {},
			};
		}

		case types.UNBLOCK_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.TOGGLE_ADMIN_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.TOGGLE_ADMIN_SUCCESS: {
			return {
				...state,
				loading: false,
				authors: payload,
				errors: {},
			};
		}

		case types.TOGGLE_ADMIN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UPDATE_USER_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UPDATE_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload,
				errors: {},
			};
		}

		case types.UPDATE_USER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.UPDATE_PROFILE_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UPDATE_PROFILE_SUCCESS: {
			return {
				...state,
				loading: false,
				profile: payload,
				errors: {},
			};
		}

		case types.UPDATE_USER_AND_PROFILE_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload.user,
				profile: payload.profile,
				errors: {},
			};
		}

		case types.UPDATE_PROFILE_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.GENERATE_PASSWORD_TOKEN_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GENERATE_PASSWORD_TOKEN_SUCCESS: {
			return {
				...state,
				loading: false,
				success: payload,
				errors: {},
			};
		}

		case types.GENERATE_PASSWORD_TOKEN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.RESET_PASSWORD_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				loading: false,
				success: payload,
			};
		}

		case types.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CLEAR_SUCCESS: {
			return {
				...state,
				success: undefined,
			};
		}

		case types.CLEAR_ERRORS: {
			return {
				...state,
				errors: {},
			};
		}

		case types.LOGOUT: {
			return {
				...state,
				user: null,
				loading: false,
				profile: {},
				post: {},
				authors: [],
				errors: {},
			};
		}

		default:
			return state;
	}
};

export default appReducer;
