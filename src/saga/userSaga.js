import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_USERS, setUsers } from '../store/userReducer';

// эффект call возвращает нам данные, которые прилетают нам в промисе
const fetchUsersFromApi = () =>
	fetch('https://jsonplaceholder.typicode.com/users?_limit=10');

// создаем воркер для асинхронного запроса на сервер
function* fetchUserWorker() {
	const data = yield call(fetchUsersFromApi); // получаем данные, в call параметром передаем промис
	console.log(data);

	// передаем в call стрелочную функцию, которая возвращает опять же промис
	const json = yield call(() => data.json()); // дата.джсон возвращает промис, оборачивать в ещё один промис не нужно // странная дичь, может и нужно // а нет, не нужно, вот ща написано правильно
	// диспатчим вызов setUsers с данными, присваиваем данные массиву users
	yield put(setUsers(json));
}

export function* userWatcher() {
	// передаем первым параметром тип экшна, а вторым воркер
	yield takeEvery(FETCH_USERS, fetchUserWorker);
}
