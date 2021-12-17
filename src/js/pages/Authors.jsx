import '../../css/authors.css';
import React from 'react';
import { connect } from 'react-redux';
import Author from '../components/Author';

const Authors = ({ authors }) => {
	return (
		<div className='authors'>
			<ul className='authors-list'>
				{authors &&
					authors.map((author) => <Author key={author._id} author={author} />)}
			</ul>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		authors: store.app.authors,
	};
}

export default connect(mapStoreToProps)(Authors);
