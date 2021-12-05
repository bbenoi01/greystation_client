import '../../css/singlePost.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogApi from '../api/blogApi';

import {
	deletePost,
	updatePost,
	toggleLike,
	annonLikeToggle,
	toggleDislike,
	annonDislikeToggle,
} from '../actions/actions';

const SinglePost = ({ dispatch, user }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const pullPost = async () => {
			const res = await blogApi.get('/api/posts/' + path);
			setPost(res.data);
			setTitle(res.data.title);
			setDescription(res.data.description);
		};
		pullPost();
		return () => {
			setPost({});
			setTitle('');
			setDescription('');
		};
	}, [path]);

	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};

	const handleUpdate = () => {
		const postDetails = {
			title,
			description,
		};
		dispatch(updatePost(post._id, postDetails));
		setUpdateMode(false);
	};

	const handleLike = () => {
		const annonId = localStorage.getItem('annonId');
		let likedPost;

		if (user) {
			likedPost = {
				postId: post.id,
			};

			dispatch(toggleLike(likedPost));
		} else {
			const annonData = {
				postId: post.id,
				annonId,
			};

			dispatch(annonLikeToggle(annonData));
		}
	};

	const handleDislike = () => {
		const annonId = localStorage.getItem('annonId');
		let dislikedPost;

		if (user) {
			dislikedPost = {
				postId: post.id,
			};

			dispatch(toggleDislike(dislikedPost));
		} else {
			const annonData = {
				postId: post.id,
				annonId,
			};

			dispatch(annonDislikeToggle(annonData));
		}
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
				<div className='single-post-feedback'>
					<div>
						<FontAwesomeIcon
							icon='thumbs-up'
							className='single-post-feedback-icon like'
							onClick={handleLike}
						/>
						{' ' + post?.likes?.length}
					</div>
					<div>
						<FontAwesomeIcon
							icon='thumbs-down'
							className='single-post-feedback-icon dislike'
							onClick={handleDislike}
						/>
						{' ' + post?.dislikes?.length}
					</div>
					<div>
						<FontAwesomeIcon
							icon='eye'
							className='single-post-feedback-icon views'
						/>
						{' ' + post?.numViews}
					</div>
				</div>
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
						{user?.isAdmin || post?.user?.handle === user?.handle ? (
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
						) : null}
					</h1>
				)}
				<div className='single-post-info'>
					<span className='single-post-author'>
						Author:{' '}
						<Link to={`/?handle=${post?.user?.handle}`} className='link'>
							<b>{post?.user?.handle}</b>
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
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				) : (
					<p className='single-post-desc'>{post.description}</p>
				)}
				{updateMode && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'right',
						}}
					>
						<button
							className='single-post-undo-btn'
							onClick={() => setUpdateMode(false)}
						>
							Undo
						</button>
						<button className='single-post-update-btn' onClick={handleUpdate}>
							Update
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(SinglePost);
