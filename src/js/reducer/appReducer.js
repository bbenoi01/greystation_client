import { types } from '../types';
const INITIAL_STATE = {
	user: JSON.parse(sessionStorage.getItem('user')) || null,
	posts: [],
	post: {},
	categories: JSON.parse(sessionStorage.getItem('categories')) || [],
	isFetching: false,
	error: false,
	errorMessage: {},
};

const appReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.LOGIN_START: {
			return {
				...state,
				isFetching: true,
			};
		}

		case types.LOGIN_SUCCESS: {
			return {
				...state,
				user: payload,
				isFetching: false,
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
				isFetching: true,
			};
		}

		case types.GET_POSTS_SUCCESS: {
			return {
				...state,
				posts: payload,
				isFetching: false,
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
				isFetching: true,
			};
		}

		case types.GET_POST_SUCCESS: {
			return {
				...state,
				post: payload,
				isFetching: false,
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
				isFetching: true,
			};
		}

		case types.SUBMIT_POST_SUCCESS: {
			return {
				...state,
				post: payload,
				isFetching: false,
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
				isFetching: true,
			};
		}

		case types.DELETE_POST_SUCCESS: {
			return {
				...state,
				isFetching: false,
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
				isFetching: true,
			};
		}

		case types.GET_CATEGORIES_SUCCESS: {
			return {
				...state,
				categories: payload,
				isFetching: false,
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

		case types.UPDATE_START: {
			return {
				...state,
				isFetching: true,
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
				isFetching: false,
				error: false,
			};
		}

		default:
			return state;
	}
};

export default appReducer;
