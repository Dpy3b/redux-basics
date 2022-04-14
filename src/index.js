import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { store } from './App';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
	<React.StrictMode>
		<Provider store={store}> {/* оборачиваем наше приложение в провайдер, он будет прокидывать через store в компоненты наше состояние */}
			<App />
		</Provider>
	</React.StrictMode>
);

