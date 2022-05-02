import { all } from 'redux-saga/effects';
import { countWatcher } from './countSaga';
import { userWatcher } from './userSaga';


// корневой вотчер для нескольких вотчеров
// функция all это глобальный вотчер, который следит за другими вотчерами
export function* rootWatcher() {
	yield all([countWatcher(), userWatcher()]);
}
