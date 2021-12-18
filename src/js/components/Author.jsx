import '../../css/author.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	getUserProfile,
	blockUser,
	unblockUser,
	sendEmail,
	deleteUser,
} from '../actions/actions';

const Author = ({ author }) => {
	const dispatch = useDispatch();
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const handleSendEmail = (e) => {
		e.preventDefault();
		const emailData = {
			to: author?.email,
			subject: subject,
			message: message,
		};

		dispatch(sendEmail(emailData));
		document.getElementById('send-email-form').reset();
		setSubject('');
		setMessage('');
	};

	return (
		<li className='author-list-item'>
			<div className='author-list-item-personal-info'>
				<img
					src={author?.profilePhoto}
					alt='Profile'
					className='author-list-item-image'
				/>
				<div className='author-list-item-details'>
					<h6 className='author-list-item-details-handle'>{author?.handle}</h6>
					<p className='text-muted author-list-item-details-email'>
						{author?.email}
					</p>
				</div>
			</div>
			<div className='author-list-item-followers'>
				<span>
					<b className='author-list-item-followers-data'>
						{author?.followers.length}
					</b>{' '}
					Followers
				</span>
			</div>
			<div className='author-action-area'>
				<Link to={`/?handle=${author?.handle}`}>
					<button
						type='button'
						className='btn btn-outline-secondary author-action-area-btn'
					>
						{author?.posts.length}-Posts
					</button>
				</Link>
				<Link
					to={`/profile/${author?._id}`}
					onClick={() => dispatch(getUserProfile(author?._id))}
				>
					<button
						type='button'
						className='btn btn-outline-warning author-action-area-btn'
					>
						Profile
					</button>
				</Link>
				{author?.isBlocked ? (
					<button
						type='button'
						className='btn btn-outline-success author-action-area-btn'
						onClick={() => dispatch(unblockUser(author?._id))}
					>
						Unblock
					</button>
				) : (
					<button
						type='button'
						className='btn btn-outline-danger author-action-area-btn'
						onClick={() => dispatch(blockUser(author?._id))}
					>
						Block
					</button>
				)}
				<button
					type='button'
					className='btn btn-primary author-action-area-btn'
					data-bs-toggle='modal'
					data-bs-target='#email-modal'
				>
					<span className='author-email-btn'>
						<FontAwesomeIcon icon='envelope' />
					</span>
					Email
				</button>
				<div
					className='modal fade'
					id='email-modal'
					data-bs-backdrop='static'
					data-bs-keyboard='false'
					tabIndex='-1'
				>
					<div className='modal-dialog modal-dialog-centered'>
						<div className='modal-content'>
							<form id='send-email-form' onSubmit={handleSendEmail}>
								<div className='modal-body'>
									<div className='mb-3'>
										<label htmlFor='to' className='form-label'>
											To:
										</label>
										<input
											type='text'
											className='form-control'
											id='to'
											value={author?.handle}
											disabled
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='subject' className='form-label'>
											Subject:
										</label>
										<input
											type='text'
											className='form-control'
											id='subject'
											onChange={(e) => setSubject(e.target.value)}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='message' className='form-label'>
											Message:
										</label>
										<textarea
											type='text'
											className='form-control'
											id='message'
											rows='5'
											onChange={(e) => setMessage(e.target.value)}
										/>
									</div>
								</div>
								<div className='modal-footer'>
									<button
										type='submit'
										className='btn btn-primary'
										data-bs-dismiss='modal'
									>
										Send
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<button
					type='button'
					className='btn btn-danger author-action-area-btn'
					onClick={() => dispatch(deleteUser(author?._id))}
				>
					<FontAwesomeIcon icon='trash-alt' />
				</button>
			</div>
		</li>
	);
};

export default Author;
