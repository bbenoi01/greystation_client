import '../../css/home.css';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

import { getPosts } from '../actions/actions';

const Home = ({ dispatch, allPosts }) => {
	const { search } = useLocation();

	const pullPosts = useCallback(() => {
		dispatch(getPosts(search));
	}, [dispatch, search]);

	useEffect(() => {
		pullPosts();
	}, [pullPosts]);

	// console.log('Home, All Posts', allPosts);
	return (
		<>
			<div className='home'>
				<Header />
				<div className='h-bottom'>
					<Posts allPosts={allPosts} />
					<Sidebar />
				</div>
			</div>
		</>
	);
};

function mapStoreToProps(store) {
	return {
		allPosts: store.app.posts,
	};
}

export default connect(mapStoreToProps)(Home);
