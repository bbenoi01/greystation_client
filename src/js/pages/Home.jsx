// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

const Home = () => {
	// const [posts, setPosts] = useState([]);
	// const { search } = useLocation();

	// useEffect(() => {
	// 	const fetchPosts = async () => {
	// 		const res = await blogApi.get('/posts' + search);
	// 		setPosts(res.data);
	// 	};
	// 	fetchPosts();
	// }, [search]);

	// console.log('posts', posts);
	return (
		<>
			<div className='primary'>
				<div className='p-top'>
					<Header />
				</div>
				<div className='p-bottom'>
					<Posts />
					<Sidebar />
				</div>
			</div>
		</>
	);
};

export default Home;
