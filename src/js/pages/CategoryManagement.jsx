import '../../css/categoryManagement.css';
import React from 'react';
import CategoryList from '../components/CategoryList';
import NewCategory from '../components/NewCategory';

const CategoryManagement = () => {
	return (
		<div className='category-management'>
			<div className='category-management-title'>
				<h2>Category Management</h2>
			</div>
			<div className='category-management-section'>
				<div className='category-management-list'>
					<CategoryList />
				</div>
				<div className='category-management-new-category'>
					<NewCategory />
				</div>
			</div>
		</div>
	);
};

export default CategoryManagement;
