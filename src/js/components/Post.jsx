import '../../css/post.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
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
			<div className='post-info'>
				<div className='post-categories'>
					{post.categories.map((category) => (
						<span className='post-category'>{category.name}</span>
					))}
					<span className='post-category'>Cool Stuff</span>
				</div>
				<Link to={`/post/${post._id}`} className='link'>
					<span className='post-title'>{post.title}</span>
				</Link>
				<span className='post-date'>
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className='post-desc'>{post.desc}</p>
		</div>
	);
};

export default Post;
