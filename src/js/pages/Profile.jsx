import '../../css/profile.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogApi from '../api/blogApi';

import { uploadProfilePhoto } from '../actions/actions';

const Profile = ({ dispatch }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [user, setUser] = useState({});
	const [handle, setHandle] = useState('');
	const [email, setEmail] = useState('');
	const [posts, setPosts] = useState([]);
	// const [views, setViews] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [file, setFile] = useState(null);
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const getUserProfile = async () => {
			const res = await blogApi.get('/api/users/profile/' + path);
			setUser(res.data);
			setHandle(res.data.handle);
			setEmail(res.data.email);
			setPosts(res.data.posts);
			// setViews(res.data.viewedBy);
			setFollowers(res.data.followers);
			setFollowing(res.data.following);
		};
		getUserProfile();
		return () => {
			setUser({});
		};
	}, [path]);

	// const handleFileInput = () => {
	// 	document.getElementById('file-input').click();
	// };

	const handleProfilePhoto = () => {
		const profilePhoto = new FormData();
		const filename = file.name;
		profilePhoto.append('name', filename);
		profilePhoto.append('file', file);

		dispatch(uploadProfilePhoto(profilePhoto));
	};

	const handleProfileUpdate = (e) => {
		e.preventDefault();
		setUpdateMode(false);
	};

	return (
		<div className='profile'>
			<img
				src={user.profilePhoto}
				alt='Profile Hero'
				height='250'
				width='100%'
				className='profile-image-hero'
			/>
			<div className='profile-wrapper'>
				<div className='profile-handle'>{user.handle}</div>
				{user.isVerified ? (
					<div
						className='alert alert-success profile-verification-alert verified'
						role='alert'
					>
						Account Verified
					</div>
				) : (
					<div
						className='alert alert-danger profile-verification-alert unverified'
						role='alert'
					>
						Unverified Account
					</div>
				)}
				<div className='profile-action-area'>
					<div className='profile-created-date'>
						<span>
							<b>Date Joined:</b> {new Date(user.createdAt).toDateString()}
						</span>
					</div>
					<div className='profile-follow-unfollow'>
						<button
							type='button'
							className='btn btn-outline-secondary unfollow-button'
						>
							<span className='profile-button-icon frown'>
								<FontAwesomeIcon icon='frown' />
							</span>
							Unfollow
						</button>
						<button
							type='button'
							className='btn btn-outline-secondary follow-button'
						>
							<span className='profile-button-icon heart'>
								<FontAwesomeIcon icon='heart' />
							</span>
							Follow
						</button>
					</div>
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
					<div className='profile-message-button'>
						<button type='button' className='btn btn-info message-button'>
							<span className='profile-button-icon envelope'>
								<FontAwesomeIcon icon='envelope' />
							</span>
							Send Message
						</button>
					</div>
				</div>
				<div className='profile-photo-update-area'>
					<label htmlFor='file-input'>
						<FontAwesomeIcon icon='plus' className='create-icon' />
					</label>
					<img
						src={file ? URL.createObjectURL(file) : user.profilePhoto}
						alt='Profile'
						className='profile-photo-preview'
					/>
					<div className='profile-stats'>
						<p>
							{posts.length} posts {followers.length} followers{' '}
							{following.length} following
						</p>
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
						<input
							type='file'
							name='file'
							id='file-input'
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<form
						className={
							updateMode ? 'profile-update-form' : 'profile-update-form hidden'
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
						<button className='btn btn-primary'>Submit</button>
					</form>
				</div>
			</div>
			<hr />
			<div className='profile-content'>
				<div className='profile-users'>
					Who Viewed My Profile
					<hr />
				</div>
				<div className='profile-posts'>
					My Posts: {posts.length}
					<hr />
					{posts &&
						posts.map((post) => (
							<div className='profile-post' key={post._id}>
								<img src={post.media} alt='' className='profile-post-media' />
								<div className='profile-post-data'>
									<h3>{post.title}</h3>
									<p className='profile-post-desc'>{post.description}</p>
									<Link to={`/post/${post._id}`} className='link'>
										Read More
									</Link>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {};
}

export default connect(mapStoreToProps)(Profile);
