import '../../css/navbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions/actions';

const Navbar = ({ dispatch, user }) => {
	const handleLogout = (e) => {
		dispatch(logout());
	};

	return (
		<nav className='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
			<div className='container-fluid'>
				{user ? (
					<>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNav'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarNav'>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link to='/' className='link'>
										Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/create' className='link'>
										Create
									</Link>
								</li>
								{/* <li className='nav-item'>
									<Link to='/settings' className='link'>
										Settings
									</Link>
								</li> */}
								<li className='nav-item'>
									<Link to='/' className='link' onClick={handleLogout}>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					</>
				) : (
					<>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNav'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarNav'>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link to='/' className='link'>
										Home
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/auth' className='link'>
										Login
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/about' className='link'>
										About
									</Link>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</nav>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.app.user,
	};
}

export default connect(mapStoreToProps)(Navbar);