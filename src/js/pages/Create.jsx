import '../../css/create.css';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { upload, submitPost } from '../actions/actions';

const Create = ({ dispatch, user }) => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const [blogType, setBlogType] = useState('');
	const [videoAddress, setVideoAddress] = useState('');

	const handleBlogSubmit = (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			desc,
			userId: user._id,
			blogType,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + '-' + file.name;
			const PF = 'https://greystation-api.herokuapp.com/images/';
			data.append('name', filename);
			data.append('file', file);
			newPost.media = PF + filename;

			dispatch(upload(data));
		}
		dispatch(submitPost(newPost));
	};

	const handleVlogSubmit = (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			media: videoAddress,
			userId: user._id,
			blogType,
		};

		dispatch(submitPost(newPost));
	};

	return (
		<div className='create'>
			<form
				encType='multipart/form-data'
				className='create-form'
				onSubmit={
					blogType === 'blog'
						? handleBlogSubmit
						: blogType === 'vlog'
						? handleVlogSubmit
						: null
				}
			>
				<div className='create-blog-type'>
					<div className='radios'>
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								name='blogType'
								id='blog'
								onChange={() => setBlogType('blog')}
							/>
							<label htmlFor='blog' className='form-check-label'>
								Blog
							</label>
						</div>
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								name='blogType'
								id='vlog'
								onChange={() => setBlogType('vlog')}
							/>
							<label htmlFor='vlog' className='form-check-label'>
								Vlog
							</label>
						</div>
					</div>
					<button
						type='submit'
						className='create-submit'
						style={blogType === '' ? { display: 'none' } : null}
					>
						Publish
					</button>
				</div>
				{blogType === 'blog' ? (
					<>
						{file && (
							<img
								src={URL.createObjectURL(file)}
								alt=''
								className='create-img'
							/>
						)}
						<div className='create-form-group file-and-title'>
							<div className='create-file'>
								<label htmlFor='file-input'>
									<FontAwesomeIcon icon='plus' className='create-icon' />
								</label>
								<input
									type='file'
									name='file'
									id='file-input'
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</div>
							<div className='create-title'>
								<input
									type='text'
									placeholder='Title'
									className='create-input'
									onChange={(e) => setTitle(e.target.value)}
									autoFocus
								/>
							</div>
						</div>
						<div className='create-form-group'>
							<textarea
								cols='50'
								rows='10'
								placeholder='Tell your story...'
								className='create-input create-text'
								onChange={(e) => setDesc(e.target.value)}
							/>
						</div>
					</>
				) : blogType === 'vlog' ? (
					<>
						{videoAddress && (
							<iframe
								title='Vlog Post'
								src={videoAddress}
								frameBorder='0'
								controls='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								className='create-img'
							/>
						)}
						<div className='create-form-group vlog-form'>
							<div className='create-video-address-input'>
								<input
									type='text'
									placeholder='Video Address'
									className='create-input'
									onChange={(e) => setVideoAddress(e.target.value)}
								/>
							</div>
							<div className='create-title'>
								<input
									type='text'
									placeholder='Title'
									className='create-input'
									onChange={(e) => setTitle(e.target.value)}
									autoFocus
								/>
							</div>
						</div>
					</>
				) : null}
			</form>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(Create);
