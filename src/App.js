import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

//let action = { type: '', payload: '' }; // пример этого объекта, обязательные два поля type (определяем по нему (по типу), как состояние будет изменяться в редюсере через свич/кейс) и поле payload - в нем храним данные которые будем изменять

// объект (может быть массив/примитив, что угодно) с состоянием - хранит в себе данные (любого типа) которые могут изменяться
const defaultState = {
	cash: 500,
};

// вот эта функция (Чистая функция!!) и есть редюсер - система которая занимается обработкой действий, когда получает их от DISPATCH (ОПЕРАТОРА)
//первым параметром принимает состояние, вторым - action (действие) которым является JS-объект
// в ней определяем как именно будет изменяться состояние в зависимости от типа
const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD_CASH':
			return { ...state, cash: state.cash + action.payload }; // т.к. состояние является неизменяемым, мы возвращаем новый объект, в него разворачиваем через ... spread старое состояние, и изменяем конкретное поле

		case 'GET_CASH':
			return { ...state, cash: state.cash - action.payload };
		default:
			return state;
	}
};

export const store = createStore(reducer); // создаём хранилище, туда кладём reducer - систему (функцию) которая будет заниматься обработкой действий (actions)

function App() {
	const dispatch = useDispatch(); // создаем вот этого оператора для изменения состояния, который будет принимать от нас поручения/действия (actions) через объекты // мы будем получать собственно DISPATCH ('оператора') с помощью хука useDispatch, получаем его внутри компонента
	const cash = useSelector(state => state.cash); // ПОЛУЧАЕМ состояние внутри компонента через хук useSelector, параметром он принимает функцию, а в ней параметр - это состояние, и в нем получаем нужную нам переменную. В нашем случае это cash

	const addCash = cash => {
		dispatch({ type: 'ADD_CASH', payload: cash }); //именно вызываем диспатч как функцию, пробрасываем в диспатч экшны, они будут попадать в редюсер, а текущий cash мы получаем выше из вызова  useSelector
	};
	const getCash = cash => {
		dispatch({ type: 'GET_CASH', payload: cash }); //именно вызываем диспатч как функцию, пробрасываем в диспатч экшны, они будут попадать в редюсер, а текущий cash мы получаем выше из вызова  useSelector
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
				{/* // при клике вызываем функцию */}
				<button
					onClick={() => getCash(Number(prompt('Введите сумму для снятия')))}
				>
					Снять со счёта
				</button>
				{/* // при клике вызываем функцию */}
			</div>
		</div>
	);
}

export default App;
