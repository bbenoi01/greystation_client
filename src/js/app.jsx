import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faGamepad,
	faSearch,
	faEdit,
	faTrashAlt,
	faUndo,
	faPlus,
	faUser,
	faUserCircle,
	faThumbsUp,
	faThumbsDown,
	faEye,
	faFrown,
	faHeart,
	faEnvelope,
	faUpload,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';
import Create from './pages/Create';
import About from './pages/About';
import CategoryManagement from './pages/CategoryManagement';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

library.add(
	fab,
	faGamepad,
	faSearch,
	faEdit,
	faTrashAlt,
	faUndo,
	faPlus,
	faUser,
	faUserCircle,
	faThumbsUp,
	faThumbsDown,
	faEye,
	faFrown,
	faHeart,
	faEnvelope,
	faUpload,
	faExclamationTriangle
);

const App = ({ user }) => {
	useEffect(() => {
		const getAnnonId = (size) =>
			[...Array(size)]
				.map(() => Math.floor(Math.random() * 16).toString(16))
				.join('');
		const annonId = localStorage.getItem('annonId');
		if (!annonId) {
			localStorage.setItem('annonId', getAnnonId(24));
		} else {
			console.log('Annon ID already exists');
		}
	});

	return (
		<Router>
			<Navbar />
			{/* {user && !user.isVerified ? (
				<div
					className='alert alert-danger'
					role='alert'
					style={{ position: 'fixed', width: '100vw', zIndex: '1' }}
				>
					<FontAwesomeIcon
						icon='exclamation-triangle'
						style={{ marginRight: '15px' }}
					/>{' '}
					Your Account Is Not Verified.{' '}
					<a href='#!' style={{ textDecoration: 'none' }}>
						Click here to verify
					</a>
				</div>
			) : null} */}
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/about'>
					<About />
				</Route>
				<Route exact path='/post/:postId'>
					<Single />
				</Route>
				<Route exact path='/create'>
					{user ? <Create /> : <Auth />}
				</Route>
				<Route exact path='/category-management'>
					{user && user.isAdmin ? <CategoryManagement /> : <Auth />}
				</Route>
				<Route exact path='/profile/:id'>
					{user ? <Profile /> : <Auth />}
				</Route>
				<Route exact path='/auth'>
					{user ? <Redirect to='/' /> : <Auth />}
				</Route>
			</Switch>
		</Router>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(App);
