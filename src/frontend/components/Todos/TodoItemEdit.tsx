import React, { useCallback } from 'react';
import { Todo } from '../../types';
import TodoGrid from './layout/TodoGrid';
import FormItem from '../reused/FormItem';
import { Formik } from 'formik';
import { updateTodoParamsSchema } from '../../schemas/rest';
import { useUpdateTodoMutation } from '../../store/api/todo';
import useGetTodos from './hooks/useGetTodos';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import useMessage from '../hooks/useMessage';
import useCheckUser from '../hooks/useCheckUser';

export default (props: { todo: Todo; disableEdit: () => void; }) => {
    const { todo } = props;
    const { userName, eMail, isModified } = todo;

    const [updateTodo] = useUpdateTodoMutation();
    const { refetchTodos } = useGetTodos();
    const message = useMessage();
    const { checkUser } = useCheckUser(false);
    const saveTodo = useCallback(async (todo: Todo) => {
        const updateResult = await updateTodo(todo);
        if ('error' in updateResult) {
            checkUser(true);
            return message('Error when saving todo');
        }
        refetchTodos();
        props.disableEdit();
    }, []);

    return (
        <Formik<Todo>
            validationSchema={updateTodoParamsSchema}
            onSubmit={saveTodo}
            initialValues={todo}
        >
            {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <TodoGrid
                        {...{ userName, eMail }}
                        text={
                            <FormItem
                                title="Todo text"
                                type="textarea"
                                name="text"
                                value={values.text}
                                onChange={handleChange}
                                error={errors.text}
                            />
                        }
                        isCompleted={
                            <Button
                                variant={!values.isCompleted ? 'primary' : 'secondary'}
                                children={!values.isCompleted ? 'Complete' : 'Uncomplete'}
                                onClick={() => setFieldValue('isCompleted', Number(!values.isCompleted))}
                            />
                        }
                        isModified={isModified ? 'Yes' : 'No'}
                        actions={
                            <ButtonGroup>
                                <Button
                                    type="submit"
                                    children="Save"
                                    disabled={JSON.stringify(values) === JSON.stringify(todo)}
                                />
                                <Button variant="secondary" onClick={props.disableEdit}>Cancel</Button>
                            </ButtonGroup>
                        }
                    />

                </Form>
            )}
        </Formik>
    );
};