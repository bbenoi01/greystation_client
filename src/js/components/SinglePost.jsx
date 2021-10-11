import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SinglePost = () => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	let [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	const user = {
		username: 'test',
	};

	post = {
		_id: 1,
		title: 'My First Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	};

	return (
		<div className='single-post'>
			<div className='single-post-wrapper'>
				{post.photo && (
					<img src={post.photo} alt='' className='single-post-img' />
				)}
				{updateMode ? (
					<input
						type='text'
						className='single-post-title-input'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className='single-post-title'>
						{post.title}
						{post.username === user?.username && (
							<div className='single-post-edit'>
								<FontAwesomeIcon
									icon='edit'
									className='single-post-icon edit'
									onClick={() => setUpdateMode(true)}
								/>
								<FontAwesomeIcon
									icon='trash-alt'
									className='single-post-icon trash'
								/>
							</div>
						)}
					</h1>
				)}
				<div className='single-post-info'>
					<span className='single-post-author'>
						Author:{' '}
						<Link to={`/?user=${post.username}`} className='link'>
							<b>{post.username}</b>
						</Link>
					</span>
					<span className='single-post-date'>
						{new Date(post.createdAt).toDateString()}
					</span>
				</div>
				{updateMode ? (
					<textarea
						name=''
						id=''
						cols='30'
						rows='10'
						className='single-post-desc-input'
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className='single-post-desc'>{post.desc}</p>
				)}
				{updateMode && (
					<button
						className='single-post-btn'
						onClick={() => setUpdateMode(false)}
					>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
