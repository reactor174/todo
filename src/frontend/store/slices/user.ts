import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../../types';

const initialState: UserState = {
    user: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<null | string>) => {
            const user = action.payload;
            state.user = user;
        },
        clearCurrentUser: (state) => {
            state.user = null;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.user;

export default userSlice.reducer;