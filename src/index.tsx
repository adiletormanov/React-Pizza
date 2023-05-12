
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './scss/app.scss';
import App from './App';

import { store } from './redux/store';


// 21 мы сделали тут существует ли на нашей странице root элемент HTML, если (т.е где if)  существует внутри него закинь все существующиие элементы
const rootElem = document.getElementById('root');


if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
	);
}
