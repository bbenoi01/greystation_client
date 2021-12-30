import '../../css/profile.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../types';

import {
	uploadProfilePhoto,
	followUser,
	unfollowUser,
	sendEmail,
	getPost,
	updateProfile,
} from '../actions/actions';

const Profile = ({ dispatch, user, profile }) => {
	const [handle, setHandle] = useState('');
	const [email, setEmail] = useState('');
	const [file, setFile] = useState(null);
	const [base64File, setBase64File] = useState('');
	const [updateMode, setUpdateMode] = useState(false);
	const [emailSubject, setEmailSubject] = useState('');
	const [emailMessage, setEmailMessage] = useState('');
	const currentUser = user?._id;
	const isSameUser = currentUser === profile?._id;
	const alreadyFollowing = user?.following?.find(
		(user) => user === profile?._id
	);

	useEffect(() => {
		setHandle(profile?.handle);
		setEmail(profile?.email);
		return () => {
			setHandle('');
			setEmail('');
		};
	}, [dispatch, profile?.handle, profile?.email]);

	const base64Encode = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				setBase64File(reader.result);
				console.log(base64File);
			};
			reader.onerror = (error) => {
				console.log('error: ', error);
			};
		}
	};

	const handleProfilePhoto = () => {
		const profilePhoto = new FormData();
		const filename = file.name;
		profilePhoto.append('name', filename);
		profilePhoto.append('file', file);
		profilePhoto.append('b64str', base64File);

		dispatch(uploadProfilePhoto(profilePhoto));
		setFile(null);
	};

	const handleProfileUpdate = (e) => {
		e.preventDefault();
		const userData = {
			handle,
			email,
		};

		dispatch(updateProfile(profile?._id, user?._id, userData));
		setUpdateMode(false);
	};

	const handleFollow = () => {
		dispatch(followUser(profile?._id));
	};

	const handleUnFollow = () => {
		dispatch(unfollowUser(profile?._id));
	};

	const handleSendEmail = (e) => {
		e.preventDefault();
		const emailData = {
			to: profile?.email,
			subject: emailSubject,
			message: emailMessage,
		};

		dispatch(sendEmail(emailData));
		document.getElementById('send-email-form').reset();
		setEmailSubject('');
		setEmailMessage('');
	};

	const handleGetPost = (postId) => {
		dispatch({
			type: types.CLEAR_POST,
		});
		dispatch(getPost(postId));
	};

	base64Encode(file);

	return (
		<div className='profile'>
			{profile && (
				<>
					<img
						src={profile?.profilePhoto}
						alt='Profile Hero'
						height='250'
						width='100%'
						className='profile-image-hero'
					/>
					<div className='profile-wrapper'>
						<div className='profile-handle'>{profile?.handle}</div>
						{profile?.isVerified ? (
							<span className='badge rounded-pill bg-success'>Verified</span>
						) : (
							<span className='badge rounded-pill bg-danger'>Unverified</span>
						)}
						<div className='profile-action-area'>
							<div className='profile-created-date'>
								<span>
									<b>Date Joined:</b>{' '}
									{new Date(profile?.createdAt).toDateString()}
								</span>
							</div>
							{!isSameUser && (
								<div className='profile-follow-unfollow'>
									{alreadyFollowing ? (
										<button
											type='button'
											className='btn btn-outline-secondary unfollow-button'
											onClick={handleUnFollow}
										>
											<span className='profile-button-icon frown'>
												<FontAwesomeIcon icon='frown' />
											</span>
											Unfollow
										</button>
									) : (
										<button
											type='button'
											className='btn btn-outline-secondary follow-button'
											onClick={handleFollow}
										>
											<span className='profile-button-icon heart'>
												<FontAwesomeIcon icon='heart' />
											</span>
											Follow
										</button>
									)}
								</div>
							)}
							{isSameUser && (
								<div className='profile-update-button'>
									<button
										type='button'
										className='btn btn-outline-secondary update-button'
										onClick={() => setUpdateMode(true)}
									>
										<span className='profile-button-icon user'>
											<FontAwesomeIcon icon='user' />
										</span>
										Update Profile
									</button>
								</div>
							)}
							{user?.isAdmin && (
								<div className='profile-message-button'>
									<button
										type='button'
										className='btn btn-primary message-button'
										data-bs-toggle='modal'
										data-bs-target='#email-modal'
									>
										<span className='profile-button-icon envelope'>
											<FontAwesomeIcon icon='envelope' />
										</span>
										Send Message
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
																value={profile?.handle}
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
																onChange={(e) =>
																	setEmailSubject(e.target.value)
																}
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
																onChange={(e) =>
																	setEmailMessage(e.target.value)
																}
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
								</div>
							)}
						</div>
						<div className='profile-photo-update-area'>
							<label htmlFor='file-input'>
								<FontAwesomeIcon icon='plus' className='create-icon' />
							</label>
							<img
								src={file ? URL.createObjectURL(file) : profile?.profilePhoto}
								alt='Profile'
								className='profile-photo-preview'
							/>
							<div className='profile-stats'>
								<p>
									{profile?.posts?.length} posts {profile?.followers?.length}{' '}
									followers {profile?.following?.length} following
								</p>
								{isSameUser && (
									<>
										{file ? (
											<button
												type='button'
												className='btn btn-outline-secondary'
												onClick={handleProfilePhoto}
											>
												<span className='profile-button-icon upload'>
													<FontAwesomeIcon icon='upload' />
												</span>
												Upload Photo
											</button>
										) : (
											<button className='btn btn-outline-secondary' disabled>
												<span className='profile-button-icon upload'>
													<FontAwesomeIcon icon='upload' />
												</span>
												Upload Photo
											</button>
										)}
										<input
											type='file'
											name='file'
											id='file-input'
											onChange={(e) => setFile(e.target.files[0])}
										/>
									</>
								)}
							</div>
							<form
								className={
									updateMode
										? 'profile-update-form'
										: 'profile-update-form hidden'
								}
								onSubmit={handleProfileUpdate}
							>
								<div className='row mb-3'>
									<label htmlFor='handle' className='col-sm-2 col-form-label'>
										Handle
									</label>
									<div className='col-sm-10'>
										<input
											type='text'
											className='form-control'
											value={handle}
											onChange={(e) => setHandle(e.target.value)}
										/>
									</div>
								</div>
								<div className='row mb-3'>
									<label htmlFor='email' className='col-sm-2 col-form-label'>
										Email
									</label>
									<div className='col-sm-10'>
										<input
											type='email'
											className='form-control'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>
								<div className='profile-update-action'>
									<button
										type='submit'
										className='btn btn-outline-danger profile-update-action-btn'
										onClick={() => setUpdateMode(false)}
									>
										Undo
									</button>
									<button type='submit' className='btn btn-outline-primary'>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					<hr />
					<div className='profile-content'>
						<div className='profile-users'>
							<span>Who Viewed My Profile: {profile?.viewedBy?.length}</span>
							<hr />
							<ul>
								{profile?.viewedBy?.length <= 0 ? (
									<h5>No Views</h5>
								) : (
									profile?.viewedBy?.map((viewer) => (
										<li key={viewer?._id} className='profile-viewer-item'>
											<img
												src={viewer?.profilePhoto}
												alt='Profile'
												className='profile-viewer-photo'
											/>
											<div className='profile-viewer-data'>
												<h5>{viewer?.handle}</h5>
												<p>Account Type</p>
											</div>
										</li>
									))
								)}
							</ul>
						</div>
						<div className='profile-posts'>
							My Posts: {profile?.posts?.length}
							<hr />
							{profile?.posts?.length <= 0 ? (
								<h2>No Posts Found</h2>
							) : (
								profile?.posts?.map((post) => (
									<div className='profile-post' key={post?._id}>
										{post?.media && post?.blogType === 'blog' ? (
											<img
												src={post?.media}
												alt=''
												className='profile-post-media'
											/>
										) : post?.media && post?.blogType === 'vlog' ? (
											<iframe
												title='Vlog Post'
												src={post?.media}
												frameBorder='0'
												controls='0'
												allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen
												className='profile-post-media'
											/>
										) : null}
										<div className='profile-post-data'>
											<h3>{post?.title}</h3>
											<p className='profile-post-desc'>{post?.description}</p>
											<Link
												to={`/post/${post?._id}`}
												className='link'
												onClick={() => handleGetPost(post?._id)}
											>
												Read More
											</Link>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
		profile: store.app.profile,
	};
}

export default connect(mapStoreToProps)(Profile);
