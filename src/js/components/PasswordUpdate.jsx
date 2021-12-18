import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '../actions/actions';

const PasswordUpdate = ({ user }) => {
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		const userData = {
			password,
		};
		dispatch(updateUser(user?._id, userData));
		document.getElementById('update-profile-form').reset();
		setPassword('');
	};

	return (
		<div
			className='modal fade'
			id='password-modal'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
			tabIndex='-1'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<form id='update-profile-form' onSubmit={handleUpdateProfile}>
						<div className='modal-body'>
							<div className='mb-3'>
								<label htmlFor='password' className='form-label'>
									New Password:
								</label>
								<input
									type='password'
									className='form-control'
									id='password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-outline-danger'
								data-bs-dismiss='modal'
							>
								Undo
							</button>
							<button
								type='submit'
								className='btn btn-outline-primary'
								data-bs-dismiss='modal'
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PasswordUpdate;
