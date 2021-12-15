import '../../css/verifyAccount.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { verifyAccount } from '../actions/actions';

const VerifyAccount = () => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const dispatch = useDispatch();

	return (
		<div className='verify-account'>
			<div className='card text-center verify-account-card'>
				<div className='card-body'>
					<FontAwesomeIcon
						icon='check-circle'
						className='verify-account-card-icon'
					/>
					<h5 className='card-title'>Verify Account</h5>
					<p className='card-text'>
						Click below to complete account verification.
					</p>
					<button
						className='btn btn-outline-success'
						onClick={() => dispatch(verifyAccount({ token: path }))}
					>
						Complete Verification
					</button>
				</div>
			</div>
		</div>
	);
};

export default VerifyAccount;
