import React from 'react';
import TodosList from './TodosList';
import Container from 'react-bootstrap/Container';
import TodoForm from './TodoForm';

export default React.memo(() => {
    return (
        <div id="todos">
            <Container id="todo-form" className="bg-light">
                <TodoForm />
            </Container>
            <Container id="todos-list" className="bg-light">
                <TodosList />
            </Container>
        </div>
    );
});