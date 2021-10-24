import '../../css/singlePost.css';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getPost, deletePost, updatePost } from '../actions/actions';

const SinglePost = ({ dispatch, user, post }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	const pullPost = useCallback(() => {
		dispatch(getPost(path));
	}, [dispatch, path]);

	useEffect(() => {
		setTitle(post.title);
		setDesc(post.desc);
		pullPost();
	}, [post.title, post.desc, pullPost]);

	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};

	const handleUpdate = () => {
		const postDetails = {
			username: user.username,
			title,
			desc,
		};
		dispatch(updatePost(post._id, postDetails));
		setUpdateMode(false);
	};

	return (
		<div className='single-post'>
			<div className='single-post-wrapper'>
				{post.media && post.blogType === 'blog' ? (
					<img src={post.media} alt='' className='single-post-img' />
				) : post.media && post.blogType === 'vlog' ? (
					<iframe
						title='Vlog Post'
						src={post.media}
						frameBorder='0'
						controls='0'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						className='single-post-img'
					/>
				) : null}
				{updateMode ? (
					<input
						type='text'
						className='single-post-title-input'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className='single-post-title'>
						{post.title}
						{post.username === user?.username && (
							<div className='single-post-edit'>
								<FontAwesomeIcon
									icon='edit'
									className='single-post-icon edit'
									onClick={() => setUpdateMode(true)}
								/>
								<FontAwesomeIcon
									icon='trash-alt'
									className='single-post-icon trash'
									onClick={handleDelete}
								/>
							</div>
						)}
					</h1>
				)}
				<div className='single-post-info'>
					<span className='single-post-author'>
						Author:{' '}
						<Link to={`/?user=${post.username}`} className='link'>
							<b>{post.username}</b>
						</Link>
					</span>
					<span className='single-post-date'>
						{new Date(post.createdAt).toDateString()}
					</span>
				</div>
				{updateMode ? (
					<textarea
						name=''
						id=''
						cols='30'
						rows='7'
						className='single-post-desc-input'
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className='single-post-desc'>{post.desc}</p>
				)}
				{updateMode && (
					<button className='single-post-btn' onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
		post: store.app.post,
	};
}

export default connect(mapStoreToProps)(SinglePost);
