import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Create = () => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const [blogType, setBlogType] = useState('');

	console.log('bt', blogType);

	return (
		<div className='create'>
			<div className='create-blog-type'>
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
			{blogType === 'blog' ? (
				<>
					{file && (
						<img
							src={URL.createObjectURL(file)}
							alt=''
							className='create-img'
						/>
					)}
					<form encType='multipart/form-data' className='create-form'>
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
						<button type='submit' className='create-submit'>
							Publish
						</button>
					</form>
				</>
			) : null}
		</div>
	);
};

export default Create;
