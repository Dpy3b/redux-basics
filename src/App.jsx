import React from 'react';
import './test';
import ReduxWithReduxThunk from './components/ReduxWithReduxThunk';
import ReduxWithReduxSaga from './components/ReduxWithReduxSaga';
function App() {
	return (
		<div className='App'>
			{/* <ReduxWithReduxThunk /> */}
			<ReduxWithReduxSaga/>
		</div>
	);
}

export default App;
