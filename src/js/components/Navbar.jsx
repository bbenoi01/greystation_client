import '../../css/navbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { types } from '../types';

import { logout, getAllAuthors, getUserProfile } from '../actions/actions';

const Navbar = ({ dispatch, user }) => {
	const handleLogout = (e) => {
		dispatch(logout());
	};

	const handleGetUserProfile = () => {
		dispatch({
			type: types.CLEAR_PROFILE,
		});
		dispatch(getUserProfile(user?._id));
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
								{user?.isAdmin && (
									<>
										<li className='nav-item'>
											<Link
												to='/authors'
												className='link'
												onClick={() => dispatch(getAllAuthors())}
											>
												Authors
											</Link>
										</li>
										<li className='nav-item'>
											<Link to='/category-management' className='link'>
												Category Management
											</Link>
										</li>
										<li className='nav-item'>
											<Link to='/about' className='link'>
												About
											</Link>
										</li>
									</>
								)}
								<li className='nav-item'>
									<Link to='/' className='link' onClick={handleLogout}>
										Logout
									</Link>
								</li>
							</ul>
							<div className='dropdown'>
								<img
									src={user?.profilePhoto}
									alt='Profile'
									className='nav-profile dropdown-toggle'
									data-bs-toggle='dropdown'
								/>
								<ul className='dropdown-menu'>
									<li>
										<Link
											to={`/profile/${user?._id}`}
											onClick={handleGetUserProfile}
										>
											Your Profile
										</Link>
									</li>
									<li data-bs-toggle='modal' data-bs-target='#password-modal'>
										Change Password
									</li>
								</ul>
							</div>
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
