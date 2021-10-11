import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const user = false;

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
									<a className='nav-link' href='!#'>
										Home
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='!#'>
										Write
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='!#'>
										Logout
									</a>
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
						<a className='navbar-brand' href='!#'>
							GreyStation13 - The Blog
						</a>
						<div className='collapse navbar-collapse' id='navbarNav'>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link to='/auth' className='link'>
										Login
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

export default Navbar;
