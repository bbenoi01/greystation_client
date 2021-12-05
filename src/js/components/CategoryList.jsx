import '../../css/categoryList.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteCategory } from '../actions/actions';

const CategoryList = ({ dispatch, categories }) => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleUndo = () => {
		setSelectedCategory(null);
	};

	const handleDelete = () => {
		dispatch(deleteCategory(selectedCategory._id));
		setSelectedCategory(null);
	};

	return (
		<div className='category-list'>
			<div className='card text-white text-center bg-dark mb-3 category-list-card'>
				<div className='card-header'>Available Categories</div>
				<div className='card-body category-list-card-body'>
					<ul className='list-group list-group-flush category-list-group'>
						{categories.map((category) => (
							<li
								className='list-group-item category-list-item'
								key={category._id}
								onClick={() => setSelectedCategory(category)}
							>
								{category.title}
							</li>
						))}
					</ul>
				</div>
				<div className='card-footer bg-dark'>
					<div
						className={
							selectedCategory
								? 'category-list-edit'
								: 'category-list-edit-hide'
						}
					>
						<FontAwesomeIcon
							icon='undo'
							className='category-list-icon undo'
							onClick={handleUndo}
						/>
						<FontAwesomeIcon
							icon='trash-alt'
							className='category-list-icon trash'
							onClick={handleDelete}
						/>
						{selectedCategory && (
							<p className='category-list-warning'>
								Are you sure you want to delete {selectedCategory.title}?
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		categories: store.app.categories,
	};
}

export default connect(mapStoreToProps)(CategoryList);
