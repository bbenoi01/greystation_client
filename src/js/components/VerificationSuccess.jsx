import '../../css/verificationSuccess.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerificationSuccess = () => {
	return (
		<div className='alert alert-success v-success' role='alert'>
			<FontAwesomeIcon icon='check-circle' className='success-icon' /> Account
			Successfully Verified
		</div>
	);
};

export default VerificationSuccess;
