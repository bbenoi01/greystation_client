import React from 'react';
import Post from './Post';

const posts = [
	{
		_id: 1,
		title: 'My First Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
	{
		_id: 2,
		title: 'My Second Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
	{
		_id: 3,
		title: 'My Third Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2015/01/26/22/40/child-613199_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
	{
		_id: 4,
		title: 'My Fourth Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2017/10/13/12/29/boy-2847513_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
	{
		_id: 5,
		title: 'My Fifth Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2017/05/08/02/22/game-2294201_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
	{
		_id: 6,
		title: 'My Sixth Post',
		desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti et magnam iure vero, unde fugiat aut nobis fugit? In, corporis incidunt rerum est provident possimus cupiditate minus earum et dolore!',
		photo:
			'https://cdn.pixabay.com/photo/2016/07/30/21/38/mario-1558068_1280.jpg',
		categories: [],
		createdAt: '2021-10-10T20:46:43.436+00:00',
		username: 'test',
	},
];

const Posts = () => {
	return (
		<div className='posts'>
			{posts.map((p) => (
				<Post key={p._id} post={p} />
			))}
		</div>
	);
};

export default Posts;
