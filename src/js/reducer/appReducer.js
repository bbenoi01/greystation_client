import { types } from '../types';
const INITIAL_STATE = {
	user: JSON.parse(sessionStorage.getItem('user')) || null,
	posts: [],
	post: {},
	categories: [],
	isfetching: false,
	error: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.LOGIN_START: {
			return {
				...state,
				isfetching: true,
			};
		}

		case types.LOGIN_SUCCESS: {
			return {
				...state,
				user: payload,
				isfetching: false,
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
				isfetching: true,
			};
		}

		case types.GET_POSTS_SUCCESS: {
			return {
				...state,
				posts: payload,
				isfetching: false,
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
				isfetching: true,
			};
		}

		case types.GET_POST_SUCCESS: {
			return {
				...state,
				post: payload,
				isfetching: false,
			};
		}

		case types.GET_POST_FAILURE: {
			return {
				...state,
				error: true,
			};
		}

		case types.GET_CATEGORIES_START: {
			return {
				...state,
				isfetching: true,
			};
		}

		case types.GET_CATEGORIES_SUCCESS: {
			return {
				...state,
				categories: payload,
				isfetching: false,
			};
		}

		case types.GET_CATEGORIES_FAILURE: {
			return {
				...state,
				error: true,
			};
		}

		case types.UPDATE_START: {
			return {
				...state,
				isfetching: true,
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
				isfetching: false,
				error: false,
			};
		}

		default:
			return state;
	}
};

export default appReducer;
