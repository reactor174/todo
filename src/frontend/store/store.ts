import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app';
import userReducer from './slices/user';
import todoReducer from './slices/todo';

import { authApi } from './api/auth';
import { todoApi } from './api/todo';

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ]: authApi.reducer,
        [ todoApi.reducerPath ]: todoApi.reducer,
        
        app: appReducer,
        user: userReducer,
        todo: todoReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(todoApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;