import '../../css/categoryList.css';
import React from 'react';
import { connect } from 'react-redux';

const CategoryList = ({ categories }) => {
	return (
		<div className='category-list'>
			<div className='card text-white text-center bg-dark mb-3 category-list-card'>
				<div className='card-header'>Header</div>
				<div className='card-body category-list-card-body'>
					<ul className='list-group list-group-flush'>
						{categories.map((category) => (
							<li
								className='list-group-item category-list-item'
								key={category._id}
							>
								{category.title}
							</li>
						))}
					</ul>
				</div>
				<div className='card-footer bg-dark'>Footer</div>
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
