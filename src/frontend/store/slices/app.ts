import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AppState } from '../../types';

const initialState: AppState = {
    authModalVisible: false,
    messages: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showAuthModal: (state) => {
            state.authModalVisible = true;
        },
        hideAuthModal: (state) => {
            state.authModalVisible = false;
        },
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
        removeMessage: (state, action: PayloadAction<number>) => {
            state.messages.splice(action.payload, 1);
        },
    },
});

export const { showAuthModal, hideAuthModal, addMessage, removeMessage } = appSlice.actions;

export const getAuthModalVisible = (state: RootState) => state.app.authModalVisible;
export const getMessages = (state: RootState) => state.app.messages;

export default appSlice.reducer;