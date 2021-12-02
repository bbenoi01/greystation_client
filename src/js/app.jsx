// import '../css/style.css';
import React from 'react';
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
	faUserCircle,
	faThumbsUp,
	faThumbsDown,
	faEye,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';
import Create from './pages/Create';
import About from './pages/About';
import CategoryManagement from './pages/CategoryManagement';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

library.add(
	fab,
	faGamepad,
	faSearch,
	faEdit,
	faTrashAlt,
	faUndo,
	faPlus,
	faUserCircle,
	faThumbsUp,
	faThumbsDown,
	faEye
);

const App = ({ user }) => {
	return (
		<Router>
			<Navbar />
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
				<Route exact path='/settings'>
					{user && user.isAdmin ? <Settings /> : <Auth />}
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
