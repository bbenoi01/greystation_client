import '../../css/resetPassword.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../types';

import { resetPassword } from '../actions/actions';

const ResetPassword = ({ dispatch, errors, success }) => {
	const [password, setPassword] = useState('');
	const location = useLocation();
	const path = location.pathname.split('/')[2];

	const handleResetPassword = (e) => {
		e.preventDefault();
		const userData = {
			token: path,
			password,
		};

		dispatch(resetPassword(userData));
		document.getElementById('reset-password-form').reset();
		setPassword('');
	};

	return (
		<div className='reset-password'>
			<div className='card text-center reset-password-card'>
				<div className='card-body'>
					<form
						className='reset-password-form'
						id='reset-password-form'
						onSubmit={handleResetPassword}
					>
						<FontAwesomeIcon
							icon='user-lock'
							className='reset-password-card-icon'
						/>
						<h5 className='card-title'>Reset Password</h5>
						<div className='mb-3'>
							{errors?.token && (
								<div className='form-text error-message'>
									<FontAwesomeIcon icon='times-circle' className='error-icon' />
									<b>{errors?.token}</b>
								</div>
							)}
							<input
								type='password'
								placeholder='Password'
								className='form-control reset-password-input'
								onChange={(e) => setPassword(e.target.value)}
								onFocus={
									success
										? () => dispatch({ type: types.CLEAR_SUCCESS })
										: errors
										? () => dispatch({ type: types.CLEAR_ERRORS })
										: null
								}
							/>
						</div>
						<button type='submit' className='btn reset-password-btn'>
							Reset Password
						</button>
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

export default connect(mapStoreToProps)(ResetPassword);
