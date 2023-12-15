import React from 'react';
import { Todo } from '../../types';
import TodoGrid from './layout/TodoGrid';
import { useAppSelector } from '../../store/hooks';
import { getCurrentUser } from '../../store/slices/user';
import Button from 'react-bootstrap/Button';

export default (props: { todo: Todo; enableEdit: () => void; }) => {
    const { todo } = props;
    const { userName, eMail, text, isCompleted, isModified } = todo;

    const user = useAppSelector(getCurrentUser);
    const allowEdit = !!user;

    return (
        <TodoGrid
            {...{ userName, eMail, text }}
            isCompleted={ isCompleted ? 'Yes' : 'No' }
            isModified={ isModified ? 'Yes' : 'No' }
            actions={
                !allowEdit
                    ? undefined
                    : <Button onClick={props.enableEdit}>Edit</Button>
            }
        />
    );
};