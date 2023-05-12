import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { RooState } from '../store';

type Sort = { //24
	name: string;
	sortProperty: "rating" | "-rating" | "price" | "-price" | "name" | "-name";
}

interface FilterSliceState { //24
	searchValue: string;
	categoryId:number;
	currentPage:number;
	sort: Sort;
}


const initialState:FilterSliceState = {
	searchValue:'',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: "rating",
	},
};

const filterSlice = createSlice ({
name: 'filters',
initialState,
reducers: {
	setSearchValue( state, action: PayloadAction<string>) {
		state.searchValue = action.payload;
	},
	setCategoryId( state, action: PayloadAction<number>) {
		state.categoryId = action.payload;
	},
	setSort( state, action:PayloadAction<Sort>) {
		state.sort = action.payload;
	},
	setCurrentPage( state, action: PayloadAction<number>) {
		state.currentPage = action.payload;
	},
	setFilters(state, action: PayloadAction<FilterSliceState>){
		state.currentPage = Number(action.payload.currentPage);
		state.sort = action.payload.sort;
		state.categoryId = Number(action.payload.categoryId);
	}
},
});


export const selectSort = (state:RooState) => state.filter.sort; //18 создаем готовую функцию для Selecror
export const selectFilter = (state:RooState) => state.filter; // 24 RooState


export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;
