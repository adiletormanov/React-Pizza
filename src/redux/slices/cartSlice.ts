import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RooState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';


export type CartItem = { //24  будет массивом объектов
id: string;
name: string;
price: number;
imageUrl: string;
type:string;
size:number;
count:number;
}

interface CartSliceState { //24
	totalPrice: number;
	items: CartItem[];
}

const {items, totalPrice}= getCartFromLS(); //26

const initialState:CartSliceState = { //16 №1  //24
  totalPrice, //сумма
  items, // товары
};

const cartSlice = createSlice({ //16  №2
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) { //24 типизируем action. т.е. мы говорим что payload должен добпалять CartItem
      const findItem = state.items.find((obj) => obj.id === action.payload.id); //16 №3 если в state.items был найден объект, у которого равен action.payload.id  (т.е. найди мне этот объект в массиве)

      if (findItem) { //16 №9 если он был найден, то тогда
        findItem.count++; //16  увеличь его в этом объекте count на +1
      } else { //16   если этот объект не нашелся, то тогда будем добавлять новый объект
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

			//16   Добавление пиццы по кнопке добавить и выводить их сумму
			state.totalPrice = calcTotalPrice(state.items);
;   },

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload); //16   №4 найди объект который  не совпадает с action.payload
    },
    clearItems(state) { //16   очищаем корзину
      state.items = [];
			state.totalPrice=0;
    },
  },
});


export const selectCart = (state:RooState) => state.cart; //18 создаем готовую функцию для Selecror

export const selectCartItemById = (id:string ) => (state:RooState) =>state.cart.items.find((obj)=>obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
