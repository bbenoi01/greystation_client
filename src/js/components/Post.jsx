import '../../css/post.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = ({ post }) => {
	// console.log('Post', post);
	return (
		<div className='post'>
			{post.media && post.blogType === 'blog' ? (
				<img src={post.media} alt='' className='post-img' />
			) : post.media && post.blogType === 'vlog' ? (
				<iframe
					title='Vlog Post'
					src={post.media}
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
					/>
					{' ' + post.likes.length}
				</div>
				<div>
					<FontAwesomeIcon
						icon='thumbs-down'
						className='post-feedback-icon dislike'
					/>
					{' ' + post.dislikes.length}
				</div>
				<div>
					<FontAwesomeIcon icon='eye' className='post-feedback-icon views' />
					{' ' + post.numViews}
				</div>
			</div>
			<div className='post-info'>
				<div className='post-categories'>
					<span className='post-category'>{post.category}</span>
				</div>
				<Link to={`/post/${post._id}`} className='link'>
					<span className='post-title'>{post.title}</span>
				</Link>
				<span className='post-date'>
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className='post-desc'>{post.description}</p>
		</div>
	);
};

export default Post;
