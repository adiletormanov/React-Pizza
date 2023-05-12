import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: {
		filter,
		cart,
		pizza
	},
});


 // 24 вытащили саму функцию store.getState ее тип typeof store.getState; получили этот тип сохранили
export type RooState = ReturnType <typeof store.getState>; //24 возвращай мне тип
//24 вот таким образом в RT делается получение типа всего хранилища
//24 тут создаем тип RooState , т.е он глобальный стейт




// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch <AppDispatch>();
