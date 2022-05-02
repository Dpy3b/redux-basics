import { put, takeEvery } from 'redux-saga/effects';
// пут это своего рода диспатч, который предназначен для асинхронных экшнов
import {
	ASYNC_DECREMENT,
	ASYNC_INCREMENT,
	decrementCreator,
	INCREMENT,
	incrementCreator,
} from '../store/countReducer';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* incrementWorker() {
	yield delay(1000);
	// пут отработает только после задержки
	// передаем экшн в аналог диспатча - пут
	yield put(incrementCreator());
}

function* decrementWorker() {
	yield delay(1000);
	yield put(decrementCreator());
}

export function* countWatcher() {
	// вотчер будет следить за выполнением асинхронного экшна
	// первым параметром передаем тип экшна за которым будем следить, вторым паратером - воркер, который должен отрабаывать, когда экшн с таким типом, который мы передаем первым параметром будет задиспатчен
	yield takeEvery(ASYNC_INCREMENT, incrementWorker);
	yield takeEvery(ASYNC_DECREMENT, decrementWorker);
}
