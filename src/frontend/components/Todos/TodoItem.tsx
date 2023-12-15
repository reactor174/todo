import React, { useCallback, useState } from 'react';
import { Todo } from '../../types';
import TodoItemEdit from './TodoItemEdit';
import TodoItemView from './TodoItemView';

export default (props: { todo: Todo }) => {
    const { todo } = props;
    
    const [edit, setEdit] = useState<boolean>(false);
    const enableEdit = useCallback(() => {
        setEdit(true);
    }, []);
    const disableEdit = useCallback(() => {
        setEdit(false);
    }, []);

    return (
        !edit
            ? <TodoItemView {...{ todo, enableEdit }} />
            : <TodoItemEdit {...{ todo, disableEdit }} />
    );
};