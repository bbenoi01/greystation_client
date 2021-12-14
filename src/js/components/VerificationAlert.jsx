import '../../css/verificationAlert.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { generateAcctVerificationToken } from '../actions/actions';

const VerificationAlert = () => {
	const dispatch = useDispatch();

	return (
		<div className='alert alert-danger v-alert' role='alert'>
			<FontAwesomeIcon icon='exclamation-triangle' className='v-alert-icon' />{' '}
			Your Account Is Not Verified.{'  '}
			<button
				className='v-alert-btn'
				onClick={() => dispatch(generateAcctVerificationToken())}
			>
				Click here to verify
			</button>
		</div>
	);
};

export default VerificationAlert;
