import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthStatus } from '../../types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/auth', }),
    endpoints: (builder) => ({
        getSessionUser: builder.mutation<string | null, void>({
            query: () => ({ url: 'user', }),
        }),
        login: builder.mutation<AuthStatus, AuthRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            }),
        }),
        logout: builder.mutation<true, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetSessionUserMutation, useLoginMutation, useLogoutMutation } = authApi;
