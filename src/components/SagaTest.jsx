import React from 'react';
import "../App.css"
import { useDispatch, useSelector } from 'react-redux';
import {
	asyncDecrementCreator,
	asyncIncrementCreator,
	decrementCreator,
	incrementCreator,
} from '../store/countReducer';
import { fetchUsers } from '../store/userReducer';

const SagaTest = () => {
	const count = useSelector(state => state.countReducer.count);
	const users = useSelector(state => state.userReducer.users);
	const dispatch = useDispatch();

	return (
		<div className='saga-parent'>
			<div className='count'>{count}</div>
			<div className='btns'>
				<button
					className='btn'
					onClick={() => dispatch(asyncIncrementCreator())}
				>
					ИНКРЕМЕНТ++
				</button>
				<button
					className='btn'
					onClick={() => dispatch(asyncDecrementCreator())}
				>
					ДЕКРЕМЕНТ--
				</button>
				<button className='btn' onClick={() => dispatch(fetchUsers())}>
					ПОЛУЧИТЬ ЮЗЕРОВ
				</button>
			</div>
			<div className='users'>
				{users.map(user => (
					<div className='user' key={user.id}>{user.name}</div>
				))}
			</div>
		</div>
	);
};

export default SagaTest;
