import '../../css/forgotPassword.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../types';

import { generateForgotPasswordToken } from '../actions/actions';

const ForgotPassword = ({ dispatch, errors, success }) => {
	const [email, setEmail] = useState('');

	const handleForgotPasswordToken = (e) => {
		e.preventDefault();
		const userData = {
			email,
		};

		dispatch(generateForgotPasswordToken(userData));
		document.getElementById('forgot-password-form').reset();
		setEmail('');
	};

	return (
		<div className='forgot-password'>
			<div className='card text-center forgot-password-card'>
				<div className='card-body'>
					<form
						className='forgot-password-form'
						id='forgot-password-form'
						onSubmit={handleForgotPasswordToken}
					>
						<FontAwesomeIcon
							icon='question-circle'
							className='forgot-password-card-icon'
						/>
						<h5 className='card-title'>Forgot Password</h5>
						<div className='mb-3'>
							<input
								type='email'
								placeholder='Email'
								className='form-control forgot-password-email'
								onChange={(e) => setEmail(e.target.value)}
								onFocus={
									success
										? () => dispatch({ type: types.CLEAR_SUCCESS })
										: errors
										? () => dispatch({ type: types.CLEAR_ERRORS })
										: null
								}
							/>
							{success && (
								<div className='form-text success-message'>
									<b>{success}</b>
								</div>
							)}
							{errors?.user && (
								<div className='form-text error-message'>
									<b>{errors?.user}</b>
								</div>
							)}
						</div>
						<button type='submit' className='btn forgot-password-btn'>
							Check Email
						</button>
						{errors?.token && (
							<div className='form-text error-message'>
								<b>{errors?.token}</b>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		errors: store.app.errors,
		success: store.app.success,
	};
}

export default connect(mapStoreToProps)(ForgotPassword);
