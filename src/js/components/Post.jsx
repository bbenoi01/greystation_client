import '../../css/post.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
	return (
		<div className='post'>
			{post.photo && <img src={post.photo} alt='' className='post-img' />}
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
				<hr />
				<span className='post-date'>
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className='post-desc'>{post.desc}</p>
		</div>
	);
};

export default Post;
