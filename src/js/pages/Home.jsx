import '../../css/home.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

import { getPosts } from '../actions/actions';

const Home = ({ dispatch, posts }) => {
	const { search } = useLocation();

	useEffect(() => {
		dispatch(getPosts(search));
	}, [search]);

	return (
		<>
			<div className='home'>
				<Header />
				<div className='h-bottom'>
					<Posts posts={posts} />
					<Sidebar />
				</div>
			</div>
		</>
	);
};

function mapStoreToProps(store) {
	return {
		posts: store.app.posts,
	};
}

export default connect(mapStoreToProps)(Home);
