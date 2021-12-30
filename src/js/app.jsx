import '../css/app.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
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
	faUserLock,
	faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import PasswordUpdate from './components/PasswordUpdate';
import VerificationAlert from './components/VerificationAlert';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyAccount from './pages/VerifyAccount';
import Blocked from './pages/Blocked';
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
	faCheckCircle,
	faUserLock,
	faQuestionCircle
);

const App = ({ user, errors }) => {
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
			<PasswordUpdate user={user} />
			{user && !user.isVerified && <VerificationAlert />}
			<Routes>
				<Route
					path='/auth'
					element={
						user ? <Navigate to='/' replace /> : <Auth errors={errors} />
					}
				/>
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset-password/:id' element={<ResetPassword />} />
				{user && user?.isBlocked ? <Blocked /> : null}
				<Route
					path='/verify-account/:token'
					element={user ? <VerifyAccount /> : <Auth />}
				/>
				<Route path='/' element={<Home />} />
				<Route path='/post/:postId' element={<Single />} />
				<Route path='/create' element={user ? <Create /> : <Auth />} />
				<Route
					exact
					path='/authors'
					element={user && user.isAdmin ? <Authors /> : <Auth />}
				/>
				<Route
					exact
					path='/category-management'
					element={user && user.isAdmin ? <CategoryManagement /> : <Auth />}
				/>
				<Route exact path='/about' element={<About />} />
				<Route
					exact
					path='/profile/:id'
					element={user ? <Profile /> : <Auth />}
				/>
			</Routes>
		</Router>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
		errors: store.app.errors,
	};
}

export default connect(mapStoreToProps)(App);
