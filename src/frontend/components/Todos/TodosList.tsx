import React from 'react';
import TodoItem from './TodoItem';
import Loading from '../reused/Loading';
import Pagination from './layout/Pagination';
import useGetTodos from './hooks/useGetTodos';
import TodosListHeader from './layout/TodosListHeader';

export default () => {
    const { todos, isLoading } = useGetTodos();

    if (isLoading) return <Loading />;
    return (
        <>
            {
                !!todos.length
                    ?
                    <>
                        <Pagination />
                        <TodosListHeader />
                        {
                            todos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                />
                            ))
                        }
                    </>
                    :
                    <>No todos here yet</>
            }

        </>
    );
};