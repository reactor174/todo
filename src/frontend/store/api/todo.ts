import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProcessStatus, Todo, TodosQueryParams } from '../../types';

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', }),
    endpoints: (builder) => ({
        getTodosCount: builder.mutation<number, void>({
            query: () => ({
                url: 'todo/count',
            }),
        }),
        getTodos: builder.query<Todo[], TodosQueryParams>({
            query: (params) => ({
                url: 'todo/get',
                params,
            }),
            keepUnusedDataFor: 120,
        }),
        addTodo: builder.mutation<Todo, Pick<Todo, 'userName' | 'eMail' | 'text'>>({
            query: (todoFormData) => ({
                url: 'todo/add',
                method: 'PUT',
                body: todoFormData,
            }),
        }),
        updateTodo: builder.mutation<ProcessStatus, Todo>({
            query: (todo) => ({
                url: 'admin/todo/update',
                method: 'POST',
                body: todo,
            }),
        }),
    }),
});

export const { useGetTodosCountMutation, useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation } = todoApi;