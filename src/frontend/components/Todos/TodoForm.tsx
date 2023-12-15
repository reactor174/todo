import React, { useCallback } from 'react';
import { AddTodoParams } from '../../types';
import TodoGrid from './layout/TodoGrid';
import Form from 'react-bootstrap/Form';
import { Formik, FormikHelpers } from 'formik';
import Button from 'react-bootstrap/Button';
import { addTodoParamsSchema } from '../../schemas/rest';
import FormItem from '../reused/FormItem';
import { useAddTodoMutation } from '../../store/api/todo';
import useGetTodos from './hooks/useGetTodos';
import { useAppDispatch } from '../../store/hooks';
import { incrementTodosCount } from '../../store/slices/todo';
import useMessage from '../hooks/useMessage';

const initialValues: AddTodoParams = {
    userName: '',
    eMail: '',
    text: '',
};

export default () => {
    const [addTodo] = useAddTodoMutation();
    const { refetchTodos } = useGetTodos();
    const dispatch = useAppDispatch();
    const message = useMessage();
    const createTodo = useCallback(async (addTodoParams: AddTodoParams, helpers: FormikHelpers<AddTodoParams>) => {
        await addTodo(addTodoParams);
        refetchTodos();
        dispatch(incrementTodosCount());
        message('Todo successfully added');
        helpers.resetForm();
    }, []);

    return (
        <Formik<AddTodoParams>
            validationSchema={addTodoParamsSchema}
            onSubmit={createTodo}
            initialValues={initialValues}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <TodoGrid
                        userName={
                            <FormItem
                                title="Username"
                                showLabel
                                name="userName"
                                value={values.userName}
                                onChange={handleChange}
                                error={touched.userName && errors.userName}
                            />
                        }
                        eMail={
                            <FormItem
                                title="Email"
                                showLabel
                                name="eMail"
                                value={values.eMail}
                                onChange={handleChange}
                                error={touched.eMail && errors.eMail}
                            />
                        }
                        text={
                            <FormItem
                                title="Todo text"
                                showLabel
                                type="textarea"
                                name="text"
                                value={values.text}
                                onChange={handleChange}
                                error={touched.text && errors.text}
                            />
                        }
                    />
                    <Button type="submit">Add</Button>
                </Form>
            )}
        </Formik>
    );
};