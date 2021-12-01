import '../../css/single.css';
import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

const Single = () => {
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
