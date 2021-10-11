import { types } from '../types';
import axios from 'axios';

export const loginStart = (userCredentials) => ({
	type: types.LOGIN_START,
});

export const loginSuccess = (user) => ({
	type: types.LOGIN_SUCCESS,
	payload: user,
});

export const loginFailure = () => ({
	type: types.LOGIN_FAILURE,
});

export const logout = () => ({
	type: types.LOGOUT,
});

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
