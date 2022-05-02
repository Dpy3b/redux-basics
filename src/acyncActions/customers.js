import { addManyCustomersAction } from '../store/customerReducer';

// чтобы мы могли потом использовать эту функцию как action (т.е. прокидывать её в диспатч), мы из этой функции должны вернуть новую функцию которая параметром принимает диспатч!
export const fetchCustomers = () => {
	return function (dispatch) {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json()) // массив пользователей, который пришёл от сервера
			// когда данные были получены, мы вызываем тот диспатч, который был прокинут через параметры, и в него прокидываем экшн-криэйтор, который вернет экшн
			.then(json => dispatch(addManyCustomersAction(json))); // прокидываем в диспатч экшн-криэйтор который вернет экшн с массивом пользоваталей который пришел от сервера
	};
};

// в папке asyncActions у нас все асинхронные запросы к какому-то внешнему API
