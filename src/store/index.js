/*
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

//вызываем функцию combineReducers которая параметром принимает объект, в который мы будем помещать все наши редюсеры
const rootReducer = combineReducers({
	cash: cashReducer,
	customers: customerReducer
})
// composeWithDevTools позволяет нам юзать в одном параметре и девтулзы для редакса, и миддлвейр
export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // создаём хранилище, туда кладём reducer - систему (функцию) которая будет заниматься обработкой действий (actions)
// шаг 2 - кладем не просто 1 редюсер (условный cashReducer), а объект со всеми редюсерами, т.е. вызов функции combineReducers
// и по итогу в стейте у нас хранится уже не 1 состояние, а несколько!!!

//вторым параметром передаем вызов вот этой функции для redux-devtools расширения, а дальше ставим расширение в хроме

// ещё туда ебеним applyMiddleware(thunk) для того чтобы работали асинхронные запросы

 */

// выше всё до саги, ниже сага

import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'; // импортируем миддлвейр саги

import countReducer from './countReducer';
import userReducer from './userReducer';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';
import createSagaMiddleware from 'redux-saga';
import { countWatcher } from '../saga/countSaga';
import { rootWatcher } from '../saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	countReducer,
	userReducer,
	cash: cashReducer,
	customers: customerReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware)); // наш пример на санках не работает, т.к. в applyMiddleware мы передали миддлвеер саги, а не санок

sagaMiddleware.run(rootWatcher); // запускаем сагу методов run, параметром передаем тот самый вотчер