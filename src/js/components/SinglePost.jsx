import '../../css/singlePost.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { types } from '../types';

import {
	deletePost,
	updatePost,
	toggleLike,
	annonLikeToggle,
	toggleDislike,
	annonDislikeToggle,
	submitComment,
	// updateComment,
	deleteComment,
	getUserProfile,
} from '../actions/actions';

const relativeTime = require('dayjs/plugin/relativeTime');

const SinglePost = ({ dispatch, user, post }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [updateMode, setUpdateMode] = useState(false);
	const [comment, setComment] = useState('');

	useEffect(() => {
		setTitle(post?.title);
		setDescription(post?.description);
		return () => {
			setTitle('');
			setDescription('');
		};
	}, [post?.title, post?.description]);

	const handleDeletePost = () => {
		dispatch(deletePost(post?._id));
	};

	const handleGetUserProfile = () => {
		dispatch({
			type: types.CLEAR_PROFILE,
		});
		dispatch(getUserProfile(post?.user?._id));
	};

	const handleUpdatePost = () => {
		const postDetails = {
			title,
			description,
		};
		dispatch(updatePost(post?._id, postDetails));
		setUpdateMode(false);
	};

	const handleLike = () => {
		const annonId = localStorage.getItem('annonId');
		let likedPost;

		if (user) {
			likedPost = {
				postId: post?._id,
			};

			dispatch(toggleLike(likedPost));
		} else {
			const annonData = {
				postId: post?._id,
				annonId,
			};

			dispatch(annonLikeToggle(annonData));
		}
	};

	const handleDislike = (e) => {
		e.preventDefault();
		const annonId = localStorage.getItem('annonId');
		let dislikedPost;

		if (user) {
			dislikedPost = {
				postId: post?._id,
			};

			dispatch(toggleDislike(dislikedPost));
		} else {
			const annonData = {
				postId: post?._id,
				annonId,
			};

			dispatch(annonDislikeToggle(annonData));
		}
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		const commentData = {
			postId: post?._id,
			description: comment,
		};
		console.log(commentData);
		dispatch(submitComment(commentData));
		document.getElementById('comment-input').reset();
	};

	// const handleUpdateComment = () => {
	// 	const commentData = {
	// 		description: comment,
	// 	};
	// 	dispatch(updateComment(post?._id, commentData));
	// };

	const handleDeleteComment = (commentId) => {
		dispatch(deleteComment(commentId, post?._id));
	};

	dayjs.extend(relativeTime);

	return (
		<div className='single-post'>
			{post && (
				<div className='single-post-wrapper'>
					{post?.media && post?.blogType === 'blog' ? (
						<img src={post?.media} alt='' className='single-post-img' />
					) : post?.media && post?.blogType === 'vlog' ? (
						<iframe
							title='Vlog Post'
							src={post?.media}
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
							{post?.title}
							{user?.isAdmin || post?.user?._id === user?._id ? (
								<div className='single-post-edit'>
									<FontAwesomeIcon
										icon='edit'
										className='single-post-icon edit'
										onClick={() => setUpdateMode(true)}
									/>
									<FontAwesomeIcon
										icon='trash-alt'
										className='single-post-icon trash'
										onClick={handleDeletePost}
									/>
								</div>
							) : null}
						</h1>
					)}
					<div className='single-post-info'>
						<span className='single-post-author'>
							Author:{' '}
							<Link
								to={`/profile/${post?.user?._id}`}
								className='link'
								onClick={handleGetUserProfile}
							>
								<b>{post?.handle}</b>
							</Link>
						</span>
						<span className='single-post-date'>
							{new Date(post?.createdAt).toDateString()}
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
						<p className='single-post-desc'>{post?.description}</p>
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
							<button
								className='single-post-update-btn'
								onClick={handleUpdatePost}
							>
								Update
							</button>
						</div>
					)}
					<div className='single-post-comments'>
						<form
							className='single-post-comment-form row'
							id='comment-input'
							onSubmit={handleAddComment}
						>
							<div className='col-sm-3'>
								<input
									type='text'
									className='single-post-comment-input form-control'
									placeholder='Enter comment'
									onChange={(e) => setComment(e.target.value)}
								/>
							</div>
							<div className='col-auto'>
								{user ? (
									<button
										type='submit'
										className='single-post-comment-submit btn'
									>
										Submit
									</button>
								) : (
									<button
										type='submit'
										className='single-post-comment-submit btn'
										disabled
									>
										Submit
									</button>
								)}
							</div>
						</form>
						<div className='single-post-comment-list'>
							<div className='col-xs-12 col-sm-5'>
								{post?.comments ? (
									post?.comments?.map((comment) => (
										<div
											className='card single-post-comment-card'
											key={comment?._id}
										>
											<div className='card-header single-post-comment-card-header'>
												<Link
													to={`/profile/${comment?.user?._id}`}
													className='single-post-comment-handle link'
												>
													<p>{comment?.user?.handle}</p>
												</Link>
												<p className='single-post-comment-date'>
													{dayjs(comment?.createdAt).fromNow()}
												</p>
											</div>
											<div className='card-body'>
												<p className='card-text'>{comment?.description}</p>
											</div>
											<div className='card-footer single-post-comment-card-footer'>
												{user?.isAdmin ? (
													<div className='single-post-edit'>
														<FontAwesomeIcon
															icon='edit'
															className='single-post-icon edit'
															onClick={() => setUpdateMode(true)}
														/>
														<FontAwesomeIcon
															icon='trash-alt'
															className='single-post-icon trash'
															onClick={() => handleDeleteComment(comment?._id)}
														/>
													</div>
												) : null}
											</div>
										</div>
									))
								) : (
									<p
										style={{
											textAlign: 'center',
										}}
									>
										No Comments
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
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
