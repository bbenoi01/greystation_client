import '../../css/posts.css';
import React from 'react';
import Post from './Post';

const Posts = ({ posts }) => {
	return (
		<div className='posts'>
			<div className='row'>
				{posts.map((p) => (
					<div key={p._id} className='col-sm-4'>
						<Post post={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
