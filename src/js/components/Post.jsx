import '../../css/post.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	toggleLike,
	annonLikeToggle,
	toggleDislike,
	annonDislikeToggle,
	getPost,
} from '../actions/actions';

const Post = ({ dispatch, user, post }) => {
	// console.log('Post', post);

	const handleLike = () => {
		const annonId = localStorage.getItem('annonId');
		let likedPost;

		if (user) {
			likedPost = {
				postId: post?.id,
			};

			dispatch(toggleLike(likedPost));
		} else {
			const annonData = {
				postId: post?.id,
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
				postId: post?.id,
			};

			dispatch(toggleDislike(dislikedPost));
		} else {
			const annonData = {
				postId: post?.id,
				annonId,
			};

			dispatch(annonDislikeToggle(annonData));
		}
	};

	const handleGetPost = () => {
		dispatch(getPost(post?.id));
	};

	return (
		<div className='post'>
			{post?.media && post?.blogType === 'blog' ? (
				<img src={post?.media} alt='' className='post-img' />
			) : post?.media && post?.blogType === 'vlog' ? (
				<iframe
					title='Vlog Post'
					src={post?.media}
					frameBorder='0'
					controls='0'
					allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='post-img vlog'
				/>
			) : null}
			<div className='post-feedback'>
				<div>
					<FontAwesomeIcon
						icon='thumbs-up'
						className='post-feedback-icon like'
						onClick={handleLike}
					/>
					{' ' + post?.likes?.length}
				</div>
				<div>
					<FontAwesomeIcon
						icon='thumbs-down'
						className='post-feedback-icon dislike'
						onClick={handleDislike}
					/>
					{' ' + post?.dislikes?.length}
				</div>
				<div>
					<FontAwesomeIcon icon='eye' className='post-feedback-icon views' />
					{' ' + post?.numViews}
				</div>
			</div>
			<div className='post-info'>
				<div className='post-categories'>
					<span className='post-category'>{post?.category}</span>
				</div>
				<Link
					to={`/post/${post?._id}`}
					className='link'
					onClick={handleGetPost}
				>
					<span className='post-title'>{post?.title}</span>
				</Link>
				<span className='post-date'>
					{new Date(post?.createdAt).toDateString()}
				</span>
			</div>
			<p className='post-desc'>{post?.description}</p>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(Post);
