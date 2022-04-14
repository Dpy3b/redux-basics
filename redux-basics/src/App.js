import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

//let action = { type: '', payload: '' };
const defaultState = {
	cash: 500,
};

// вот эта функция и есть редюсер - система которая занимается обработкой действий, когда получает их от DISPATCH (ОПЕРАТОРА)
const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD_CASH':
			return { ...state, cash: state.cash + action.payload };

		case 'GET_CASH':
			return { ...state, cash: state.cash - action.payload };
		default:
			return state;
	}
};

export const store = createStore(reducer);

function App() {
	const dispatch = useDispatch();
	const cash = useSelector(state => state.cash);

	const addCash = cash => {
		dispatch({ type: 'ADD_CASH', payload: cash });
	};
	const getCash = cash => {
		dispatch({ type: 'GET_CASH', payload: cash });
	};

	return (
		<div className="App">
			<h1>Redux basics</h1>
			<div style={{ fontSize: '20px', marginBottom: '20px' }}>{cash}</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button
					onClick={() =>
						addCash(Number(prompt('Введите сумму для пополнения')))
					}
				>
					Пополнить счёт
				</button>
				<button
					onClick={() => getCash(Number(prompt('Введите сумму для снятия')))}
				>
					Снять со счёта
				</button>
			</div>
		</div>
	);
}

export default App;
