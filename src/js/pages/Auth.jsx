import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
	const [authType, setAuthType] = useState('login');
	const [title, setTitle] = useState('Login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const updateAuthType = () => {
		if (authType === 'login') {
			setAuthType('register');
			setTitle('Register');
		} else if (authType === 'register') {
			setAuthType('login');
			setTitle('Login');
		}
		setEmail('');
		setPassword('');
		setUsername('');
	};

	return (
		<div className='auth'>
			<div className='auth-title'>{title}</div>
			<form className='auth-form'>
				{authType === 'register' ? (
					<>
						<label htmlFor=''>Username</label>
						<input
							type='text'
							placeholder='Enter Username...'
							className='auth-input'
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor=''>Email</label>
						<input
							type='email'
							placeholder='Enter Email...'
							className='auth-input'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor=''>Password</label>
						<input
							type='password'
							placeholder='Enter Password...'
							className='auth-input'
							onChange={(e) => setPassword(e.target.value)}
						/>
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
						<label htmlFor=''>Password</label>
						<input
							type='password'
							placeholder='Password'
							className='auth-input'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</>
				)}
				<button className='auth-submit' type='submit'>
					{title.toUpperCase()}
				</button>
			</form>
			<button className='auth-switch' onClick={updateAuthType}>
				{authType === 'login' ? 'Register' : 'Login'}
			</button>
		</div>
	);
};

export default Auth;
