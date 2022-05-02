import React from 'react';
import './App.css';
//import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './acyncActions/customers';
import "./test"
import SagaTest from './components/SagaTest';
//let action = { type: '', payload: '' }; // пример этого объекта, обязательные два поля type (определяем по нему (по типу), как состояние будет изменяться в редюсере через свич/кейс) и поле payload - в нем храним данные которые будем изменять

// объект (может быть массив/примитив, что угодно) с состоянием - хранит в себе данные (любого типа) которые могут изменяться
const defaultState = {
	cash: 500,
};

function App() {
	const dispatch = useDispatch(); // создаем вот этого оператора для изменения состояния, который будет принимать от нас поручения/действия (actions) через объекты // мы будем получать собственно DISPATCH ('оператора') с помощью хука useDispatch, получаем его внутри компонента

	const cash = useSelector(state => state.cash.cash); // ПОЛУЧАЕМ состояние внутри компонента через хук useSelector, параметром он принимает функцию, а в ней параметр - это состояние, и в нем получаем нужную нам переменную. В нашем случае это cash // обращаемся здесь уже к конкретному редюсеру, а раньше мы просто обращались к одному через state.cash

	const customers = useSelector(state => state.customers.customers); // указываем правильное название КОНКРЕТНОГО РЕДЮСЕРА и массива

	const addCash = cash => {
		dispatch({ type: 'ADD_CASH', payload: cash }); //именно вызываем диспатч как функцию, пробрасываем в диспатч экшны, они будут попадать в редюсер, а текущий cash мы получаем выше из вызова  useSelector
	};
	const getCash = cash => {
		dispatch({ type: 'GET_CASH', payload: cash }); //именно вызываем диспатч как функцию, пробрасываем в диспатч экшны, они будут попадать в редюсер, а текущий cash мы получаем выше из вызова  useSelector
	};


	const addCustomer = (name)=> {
		const customer = {
			name,
			id: Date.now()
		}
		//dispatch({ type: 'ADD_CUSTOMER', payload: customer }); // теперь уже передаем не объект, а экшн криэйтор, который вернет нам этот объект, и передаем данные, в нашем случае customer
		dispatch(addCustomerAction(customer)) // ну да, так гораздо удобнее, мы тупа генерируем объекты для диспатча на ходу, какие нам надо, тип подставляется в зависимости от функции-экшн-криейтора, а данные мы передаем сами через параметр
	}

	const removeCustomer = (customer) => {
		//dispatch({ type: 'REMOVE_CUSTOMER', payload: customer.id });
		// тут то же что и для addCustomer делаем
		dispatch(removeCustomerAction(customer.id))
	}

	return (
		<div className="App">
			<h1>Redux basics</h1>
			<div style={{ fontSize: '20px', marginBottom: '20px' }}>{cash}</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button className='button'
					onClick={() =>
						addCash(Number(prompt('Введите сумму для пополнения')))
					}
				>
					Пополнить счёт
				</button>
				{/* // при клике вызываем функцию */}
				<button className='button'
					onClick={() => getCash(Number(prompt('Введите сумму для снятия')))}
				>
					Снять со счёта
				</button>
				{/* // при клике вызываем функцию */}
				<button className='button' onClick={() => addCustomer(prompt('Введите имя клиента'))}>
					Добавить клиента
				</button>
				{/* при нажатии обрабатываем ту асинхронную функцию через диспатч */}
				<button className='button' onClick={()=> dispatch(fetchCustomers())}>
					Получить клиентов из базы
				</button>
			</div>

			{customers.length > 0 ? (
				<div>
					{customers.map(customer => (
						<div key={customer.id} onClick={() => removeCustomer(customer)}>
							{customer.name}
						</div>
					))}
				</div>
			) : (
				<div style={{ fontSize: '20px' }}>Клиенты отсутствуют!</div>
			)}
			<SagaTest/>
		</div>
	);
}

export default App;
