import '../../css/create.css';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { submitPost } from '../actions/actions';

const Create = ({ dispatch, user, categories }) => {
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
	const [base64File, setBase64File] = useState('');
	const [blogType, setBlogType] = useState('');
	const [videoAddress, setVideoAddress] = useState('');

	const base64Encode = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				setBase64File(reader.result);
				console.log(base64File);
			};
			reader.onerror = (error) => {
				console.log('error: ', error);
			};
		}
	};

	const handleBlogSubmit = (e) => {
		e.preventDefault();
		let newPost;
		if (file) {
			newPost = new FormData();
			const filename = file.name;
			newPost.append('name', filename);
			newPost.append('file', file);
			newPost.append('b64str', base64File);
			newPost.append('title', title);
			newPost.append('category', category);
			newPost.append('description', description);
			newPost.append('blogType', blogType);
		} else {
			newPost = {
				title,
				category,
				description,
				blogType,
			};
		}
		dispatch(submitPost(newPost));
	};

	const handleVlogSubmit = (e) => {
		e.preventDefault();
		const newPost = {
			title,
			category,
			description: 'VLOG',
			media: videoAddress,
			blogType,
		};

		dispatch(submitPost(newPost));
	};

	base64Encode(file);

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
							<select
								className='form-select'
								onChange={(e) => setCategory(e.target.value)}
							>
								<option defaultValue>Choose a Category...</option>
								{categories &&
									categories?.map((category) => (
										<option key={category?._id} value={category?.title}>
											{category?.title}
										</option>
									))}
							</select>
						</div>
						<div className='create-form-group'>
							<textarea
								cols='50'
								rows='10'
								placeholder='Tell your story...'
								className='create-input create-text'
								onChange={(e) => setDescription(e.target.value)}
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
						<div className='create-form-group'>
							<select
								className='form-select'
								onChange={(e) => setCategory(e.target.value)}
							>
								<option defaultValue>Choose a Category...</option>
								{categories &&
									categories?.map((category) => (
										<option key={category?._id} value={category?.title}>
											{category?.title}
										</option>
									))}
							</select>
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
		categories: store.app.categories,
	};
}

export default connect(mapStoreToProps)(Create);
