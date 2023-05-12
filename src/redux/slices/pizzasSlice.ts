//17  урок
import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RooState } from '../store';
import { CartItem } from './cartSlice';



type Pizza = {
  //24
  id: number;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};

export enum Status { //24
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR ='error'
}

interface PizzaSliceState {
  //24
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | succes | error
};



// type FetchPizzasArgs = {
// 	sortBy: string,
// 	order: string,
// 	category: string,
// 	search: string,
// 	currentPage: string,
// }

// type FetchPizzasArgs = Record<string, string>; // 24 типизация целого объекта

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>( //24 типизирован <CartItem[], Record<string, string>>
  //17 № с помощью этой функции мы создаем ассинхронный экшен. т.е. pizza должна делать какое то ассинхронное действие
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>( //24 добавили <CartItem[]>
      // в ассинхронным действии делаем запрос
      `https://6433e582582420e2316e5607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data; // когда запрос выполниться верни мне ответ
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) { //24 PayloadAction<Pizza[]>
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;;
      state.items = [];
    });
  },
});

//   extraReducers: {
//     // действие fetchPizzas которое выше его передали в extraReducers
//     [fetchPizzas.pending]: (state) => {
//       state.status = 'loading';
//       state.items = [];
//     },
//     [fetchPizzas.fulfilled]: (state, action) => {
//       state.items = action.payload;
//       state.status = 'success';
//     },
//     [fetchPizzas.rejected]: (state, action) => {
//       state.status = 'error';
//       state.items = [];
//     },
//   },
// });

export const selectPizzaData = (state: RooState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
