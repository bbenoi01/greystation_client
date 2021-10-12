import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { getCategories } from '../actions/actions';

const Sidebar = ({ dispatch, categories }) => {
	useEffect(() => {
		dispatch(getCategories());
	});

	return (
		<div className='sidebar'>
			<div className='sidebar-item'>
				<div className='sidebar-title'>About Me</div>
				<img
					src='/dj_greystation.jpg'
					alt='DJ GreyStation'
					className='sidebar-img'
				/>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et
					magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt
					rerum est provident possimus cupiditate minus earum et dolore!
				</p>
			</div>
			<div className='sidebar-item'>
				<div className='sidebar-title'>CATEGORIES</div>
				<ul className='sidebar-list'>
					{categories.map((category) => (
						<Link to={`/?category=${category.name}`} className='link'>
							<li className='sidebar-list-item'>{category.name}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className='sidebar-item'>
				<div className='sidebar-title'>FOLLOW US</div>
				<div className='sidebar-social'>
					<FontAwesomeIcon icon={['fab', 'xbox']} />
					<FontAwesomeIcon icon={['fab', 'playstation']} />
					<FontAwesomeIcon icon='gamepad' />
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

export default connect(mapStoreToProps)(Sidebar);
