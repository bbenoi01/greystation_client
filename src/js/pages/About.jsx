import '../../css/about.css';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { getCategories } from '../actions/actions';

const About = ({ dispatch, categories }) => {
	const pullCats = useCallback(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		pullCats();
	}, [pullCats]);

	return (
		<div className='about'>
			<div className='about-item'>
				<div className='about-title'>About Me</div>
				<img
					src='/dj_greystation.jpg'
					alt='DJ GreyStation'
					className='about-img'
				/>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et
					magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt
					rerum est provident possimus cupiditate minus earum et dolore!
				</p>
			</div>
			<div className='about-item'>
				<div className='about-title'>CATEGORIES</div>
				<ul className='about-list'>
					{categories?.map((category) => (
						<Link
							to={`/?category=${category?.title}`}
							key={category?._id}
							className='link'
						>
							<li>{category?.title}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className='about-item'>
				<div className='about-title'>FOLLOW ME</div>
				<div className='about-social'>
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

export default connect(mapStoreToProps)(About);
