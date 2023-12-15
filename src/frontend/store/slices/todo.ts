import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TodoState } from '../../types';

const initialState: TodoState = {
    todosCount: 0,
    currentPageNumber: 0,
    itemsPerPageCount: 3,
    sortingField: 'id',
    sortingOrder: 'desc',
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodosCount: (state, action: PayloadAction<number>) => {
            state.todosCount = action.payload;
        },
        incrementTodosCount: (state) => {
            state.todosCount++;
        },
        setCurrentPageNumber: (state, action: PayloadAction<number>) => {
            state.currentPageNumber = action.payload;
        },
        changeSorting: (state, action: PayloadAction<Partial<Pick<TodoState, 'sortingOrder' | 'sortingField'>>>) => {
            const { sortingOrder, sortingField } = action.payload;
            if (sortingOrder) state.sortingOrder = sortingOrder;
            if (sortingField) state.sortingField = sortingField;
        },
    },
});

export const { setTodosCount, incrementTodosCount, setCurrentPageNumber, changeSorting } = todoSlice.actions;

export const getPaginationSettings = createSelector(
    (state: RootState) => state.todo,
    ({ todosCount, itemsPerPageCount, currentPageNumber }) => {
        const pagesCount = Math.ceil(todosCount / itemsPerPageCount);
        return { pagesCount, currentPageNumber };
    }
);
export const getSortingSettings = createSelector(
    (state: RootState) => state.todo,
    ({sortingField, sortingOrder}) => ({sortingField, sortingOrder})
);
export const getTodosQueryParams = createSelector(
    (state: RootState) => state.todo,
    ({ currentPageNumber, ...otherStateParams }) => ({
        ...(currentPageNumber ? { currentPageNumber } : {}),
        ...otherStateParams,
    })
);

export default todoSlice.reducer;