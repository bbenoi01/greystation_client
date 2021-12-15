import { types } from '../types';
const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	posts: [],
	post: {},
	categories: JSON.parse(sessionStorage.getItem('categories')) || [],
	loading: false,
	error: false,
	errorMessage: {},
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
				error: false,
			};
		}

		case types.LOGIN_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.GET_POSTS_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.GET_POST_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.SUBMIT_POST_FAILURE: {
			return {
				...state,
				errorMessage: payload,
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
			};
		}

		case types.DELETE_POST_FAILURE: {
			return {
				...state,
				errorMessage: payload,
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
			};
		}

		case types.GET_CATEGORIES_FAILURE: {
			return {
				...state,
				error: true,
			};
		}

		case types.CLEAR_POST: {
			return {
				...state,
				post: {},
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
			};
		}

		case types.FOLLOW_USER_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.UNFOLLOW_USER_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.SEND_EMAIL_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.GENERATE_VERIFICATION_TOKEN_FAILURE: {
			return {
				...state,
				error: true,
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
			};
		}

		case types.VERIFY_ACCOUNT_FAILURE: {
			return {
				...state,
				error: true,
			};
		}

		case types.UPDATE_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.UPDATE_SUCCESS: {
			return {
				...state,
				user: payload,
			};
		}

		case types.UPDATE_FAILURE: {
			return {
				...state,
				user: state.user,
				error: true,
			};
		}

		case types.LOGOUT: {
			return {
				...state,
				user: null,
				loading: false,
				error: false,
			};
		}

		default:
			return state;
	}
};

export default appReducer;
