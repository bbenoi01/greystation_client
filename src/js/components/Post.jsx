import '../../css/post.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ singlePost }) => {
	return (
		<div className='post'>
			{singlePost.media && singlePost.blogType === 'blog' ? (
				<img src={singlePost.media} alt='' className='post-img' />
			) : singlePost.media && singlePost.blogType === 'vlog' ? (
				<iframe
					title='Vlog Post'
					src={singlePost.media}
					frameBorder='0'
					controls='0'
					allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className='post-img vlog'
				/>
			) : null}
			<div className='post-info'>
				<div className='post-categories'>
					{/* {singlePost.categories.map((category) => (
						<span className='post-category'>{category.name}</span>
					))} */}
					<span className='post-category'>Cool Stuff</span>
				</div>
				<Link to={`/post/${singlePost._id}`} className='link'>
					<span className='post-title'>{singlePost.title}</span>
				</Link>
				<span className='post-date'>
					{new Date(singlePost.createdAt).toDateString()}
				</span>
			</div>
			<p className='post-desc'>{singlePost.description}</p>
		</div>
	);
};

export default Post;
