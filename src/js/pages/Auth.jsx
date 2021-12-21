import '../../css/auth.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { types } from '../types';

import { register, login } from '../actions/actions';

const Auth = ({ errors }) => {
	const [authType, setAuthType] = useState('login');
	const [title, setTitle] = useState('Login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [handle, setHandle] = useState('');
	const dispatch = useDispatch();

	const updateAuthType = () => {
		if (authType === 'login') {
			setAuthType('register');
			setTitle('Register');
		} else if (authType === 'register') {
			setAuthType('login');
			setTitle('Login');
		}
		dispatch({
			type: types.CLEAR_ERRORS,
		});
		document.getElementById('auth-form').reset();
		setEmail('');
		setPassword('');
		setHandle('');
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const userCredentials = {
			email,
			password,
		};

		dispatch(login(userCredentials));
	};

	const handleRegister = (e) => {
		e.preventDefault();
		const userCredentials = {
			handle,
			email,
			password,
		};

		dispatch(register(userCredentials));
	};

	return (
		<div className='auth'>
			<div className='card auth-card'>
				<div className='card-body'>
					<div className='card-title auth-title'>{title}</div>
					<form
						className='auth-form'
						onSubmit={authType === 'login' ? handleLogin : handleRegister}
						id='auth-form'
					>
						{authType === 'register' ? (
							<>
								<label htmlFor=''>Handle</label>
								<input
									type='text'
									placeholder='Enter Handle...'
									className='auth-input'
									onChange={(e) => setHandle(e.target.value)}
								/>
								{errors && errors?.handle && (
									<p className='error-message'>
										<b>{errors.handle}</b>
									</p>
								)}
								<label htmlFor=''>Email</label>
								<input
									type='email'
									placeholder='Enter Email...'
									className='auth-input'
									onChange={(e) => setEmail(e.target.value)}
								/>
								{errors && errors?.email && (
									<p className='error-message'>
										<b>{errors.email}</b>
									</p>
								)}
								<label htmlFor=''>Password</label>
								<input
									type='password'
									placeholder='Enter Password...'
									className='auth-input'
									onChange={(e) => setPassword(e.target.value)}
								/>
								{errors && errors?.password && (
									<p className='error-message'>
										<b>{errors.password}</b>
									</p>
								)}
							</>
						) : (
							<>
								<label htmlFor=''>Email</label>
								<input
									type='email'
									placeholder='Email'
									className='auth-input'
									onChange={(e) => setEmail(e.target.value)}
								/>
								{errors && errors?.email && (
									<p className='error-message'>
										<b>{errors.email}</b>
									</p>
								)}
								<label htmlFor=''>Password</label>
								<input
									type='password'
									placeholder='Password'
									className='auth-input'
									onChange={(e) => setPassword(e.target.value)}
								/>
								{errors && errors?.password && (
									<p className='error-message'>
										<b>{errors.password}</b>
									</p>
								)}
							</>
						)}
						<button className='auth-submit' type='submit'>
							{title.toUpperCase()}
						</button>
					</form>
					<Link to={'/forgot-password'} className='auth-forgot-password link'>
						Forgot Password
					</Link>
				</div>
			</div>
			<button className='auth-switch' onClick={updateAuthType}>
				{authType === 'login' ? 'Register' : 'Login'}
			</button>
		</div>
	);
};

export default Auth;
