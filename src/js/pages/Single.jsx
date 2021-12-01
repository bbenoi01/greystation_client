import '../../css/single.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

import { clearLoadedPost } from '../actions/actions';

const Single = ({ dispatch }) => {
	useEffect(() => {
		return () => {
			dispatch(clearLoadedPost());
		};
	}, [dispatch]);

	return (
		<div className='single'>
			<SinglePost />
			<Sidebar />
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		post: store.app.post,
	};
}

export default connect(mapStoreToProps)(Single);
