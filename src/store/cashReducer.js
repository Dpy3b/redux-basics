// вот эта функция (Чистая функция!!) и есть редюсер - система которая занимается обработкой действий, когда получает их от DISPATCH (ОПЕРАТОРА)
//первым параметром принимает состояние, вторым - action (действие) которым является JS-объект
// в ней определяем как именно будет изменяться состояние в зависимости от типа
const defaultState = {
	cash: 500,
};

export const cashReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD_CASH':
			return { ...state, cash: state.cash + action.payload }; // т.к. состояние является неизменяемым, мы возвращаем новый объект, в него разворачиваем через ... spread старое состояние, и изменяем конкретное поле

		case 'GET_CASH':
			return { ...state, cash: state.cash - action.payload };
		default:
			return state;
	}
};
