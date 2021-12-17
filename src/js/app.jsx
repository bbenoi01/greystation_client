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
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import VerificationAlert from './components/VerificationAlert';
import Auth from './pages/Auth';
import VerifyAccount from './pages/VerifyAccount';
import Home from './pages/Home';
import Single from './pages/Single';
import Create from './pages/Create';
import Authors from './pages/Authors';
import CategoryManagement from './pages/CategoryManagement';
import About from './pages/About';
import Profile from './pages/Profile';

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
	faExclamationTriangle,
	faCheckCircle
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
			{user && !user.isVerified && <VerificationAlert />}
			<Switch>
				<Route exact path='/auth'>
					{user ? <Redirect to='/' /> : <Auth />}
				</Route>
				<Route exact path='/verify-account/:token'>
					{user ? <VerifyAccount /> : <Auth />}
				</Route>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/post/:postId'>
					<Single />
				</Route>
				<Route exact path='/create'>
					{user ? <Create /> : <Auth />}
				</Route>
				<Route exact path='/authors'>
					{user && user.isAdmin ? <Authors /> : <Auth />}
				</Route>
				<Route exact path='/category-management'>
					{user && user.isAdmin ? <CategoryManagement /> : <Auth />}
				</Route>
				<Route exact path='/about'>
					<About />
				</Route>
				<Route exact path='/profile/:id'>
					{user ? <Profile /> : <Auth />}
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
