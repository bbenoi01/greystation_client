import '../../css/singlePost.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blogApi from '../api/blogApi';

import { deletePost, updatePost } from '../actions/actions';

const SinglePost = ({ dispatch, user }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const pullPost = async () => {
			const res = await blogApi.get('/api/posts/' + path);
			setPost(res.data);
			setTitle(res.data.title);
			setDesc(res.data.description);
		};
		pullPost();
		return () => {
			setPost({});
			setTitle('');
			setDesc('');
		};
	}, [path]);

	const handleDelete = () => {
		dispatch(deletePost(post._id));
	};

	const handleUpdate = () => {
		const postDetails = {
			username: user.username,
			title,
			desc,
		};
		dispatch(updatePost(post._id, postDetails));
		setUpdateMode(false);
	};

	return (
		<div className='single-post'>
			<div className='single-post-wrapper'>
				{post.media && post.blogType === 'blog' ? (
					<img src={post.media} alt='' className='single-post-img' />
				) : post.media && post.blogType === 'vlog' ? (
					<iframe
						title='Vlog Post'
						src={post.media}
						frameBorder='0'
						controls='0'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						className='single-post-img'
					/>
				) : null}
				<div className='single-post-feedback'>
					<div>
						<FontAwesomeIcon
							icon='thumbs-up'
							className='single-post-feedback-icon like'
						/>
						{' ' + post?.likes?.length}
					</div>
					<div>
						<FontAwesomeIcon
							icon='thumbs-down'
							className='single-post-feedback-icon dislike'
						/>
						{' ' + post?.dislikes?.length}
					</div>
					<div>
						<FontAwesomeIcon
							icon='eye'
							className='single-post-feedback-icon views'
						/>
						{' ' + post?.numViews}
					</div>
				</div>
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
						{user?.isAdmin || post?.user?.handle === user?.handle ? (
							<div className='single-post-edit'>
								<FontAwesomeIcon
									icon='edit'
									className='single-post-icon edit'
									onClick={() => setUpdateMode(true)}
								/>
								<FontAwesomeIcon
									icon='trash-alt'
									className='single-post-icon trash'
									onClick={handleDelete}
								/>
							</div>
						) : null}
					</h1>
				)}
				<div className='single-post-info'>
					<span className='single-post-author'>
						Author:{' '}
						<Link to={`/?user=${post?.user?.handle}`} className='link'>
							<b>{post?.user?.handle}</b>
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
						rows='7'
						className='single-post-desc-input'
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className='single-post-desc'>{post.description}</p>
				)}
				{updateMode && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'right',
						}}
					>
						<button
							className='single-post-undo-btn'
							onClick={() => setUpdateMode(false)}
						>
							Undo
						</button>
						<button className='single-post-update-btn' onClick={handleUpdate}>
							Update
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(SinglePost);
