import '../../css/newCategory.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCategory } from '../actions/actions';

const NewCategory = ({ dispatch }) => {
	const [title, setTitle] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const category = {
			title,
		};

		dispatch(addCategory(category));
		setTitle('');
		document.getElementById('new-category-form').reset();
	};

	return (
		<div className='new-category'>
			<div className='new-category-title'>
				<h2>Add New Category</h2>
			</div>
			<div className='new-category-subtitle'>
				<p>
					<small>Categories used when creating a post.</small>
				</p>
			</div>
			<form
				className='new-category-form'
				id='new-category-form'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					className='new-category-input'
					placeholder='New Category'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button className='new-category-submit' type='submit'>
					Add Category
				</button>
			</form>
		</div>
	);
};

function mapStoreToProps(store) {
	return {};
}

export default connect(mapStoreToProps)(NewCategory);
