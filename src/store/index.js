import { createStore, combineReducers, applyMiddleware } from 'redux';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

//вызываем функцию combineReducers которая параметром принимает объект, в который мы будем помещать все наши редюсеры
const rootReducer = combineReducers({
	cash: cashReducer,
	customers: customerReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // создаём хранилище, туда кладём reducer - систему (функцию) которая будет заниматься обработкой действий (actions)
// шаг 2 - кладем не просто 1 редюсер (условный cashReducer), а объект со всеми редюсерами, т.е. вызов функции combineReducers
// и по итогу в стейте у нас хранится уже не 1 состояние, а несколько!!!

//вторым параметром передаем вызов вот этой функции для redux-devtools расширения, а дальше ставим расширение в хроме