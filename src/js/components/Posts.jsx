import '../../css/posts.css';
import React from 'react';
import Post from './Post';

const Posts = ({ allPosts }) => {
	// console.log('Posts, All Posts', allPosts);

	return (
		<div className='posts'>
			<div className='row'>
				{allPosts.map((post) => (
					<div key={post._id} className='col-xs-12 col-md posts-col'>
						<Post post={post} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
