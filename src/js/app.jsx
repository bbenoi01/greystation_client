import React from 'react';
import '../css/style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faGamepad,
	faSearch,
	faEdit,
	faTrashAlt,
	faPlus,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';
import Auth from './pages/Auth';

library.add(fab, faGamepad, faSearch, faEdit, faTrashAlt, faPlus, faUserCircle);

const App = () => {
	const user = false;

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/post/:postId'>
					<Single />
				</Route>
				{/* <Route path='/wrtie'>{user ? <Write /> : <Auth />}</Route>
				<Route path='/settings'>{user ? <Settings /> : <Auth />}</Route> */}
				<Route path='/auth'>{user ? <Home /> : <Auth />}</Route>
			</Switch>
		</Router>
	);
};

export default App;
