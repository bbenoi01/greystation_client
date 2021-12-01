import '../../css/posts.css';
import React from 'react';
import Post from './Post';

const Posts = ({ allPosts }) => {
	return (
		<div className='posts'>
			<div className='row'>
				{allPosts.map((p) => (
					<div key={p._id} className='col-xs-12 col-md-6 col-lg-4 posts-col'>
						<Post singlePost={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
