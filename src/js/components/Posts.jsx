import '../../css/posts.css';
import React from 'react';
import Post from './Post';

const Posts = ({ allPosts }) => {
	console.log('All Posts', allPosts);
	return (
		<div className='posts'>
			<div className='row'>
				{allPosts.map((p) => (
					<div key={p._id} className='col-xs-12 col-sm-6'>
						<Post singlePost={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
