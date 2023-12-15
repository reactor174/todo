import type { GetTodosRequestParams, Todo } from '../types';
import { select, insert, query } from '../services/mysql';

export async function getTodosCount(): Promise<number> {
    const [{ count }] = await select<{ count: number }>(`
        SELECT count(id) AS count FROM Todo
    `);
    return count;
}

export async function getTodos(params: GetTodosRequestParams): Promise<Todo[]> {
    const { currentPageNumber = 0, itemsPerPageCount, sortingField, sortingOrder } = params;

    const todos = await select<Todo>(`
        SELECT *
        FROM Todo
        ORDER BY ${sortingField} ${sortingOrder}
        LIMIT ${currentPageNumber * itemsPerPageCount}, ${itemsPerPageCount}
    `);
    return todos;
}

export async function createTodo(userName: string, eMail: string, text: string): Promise<number> {
    const newTodoId = await insert(
        'INSERT INTO Todo SET ?',
        [{ userName, eMail, text }]
    );
    return newTodoId;
}

export async function updateTodo(todo: Todo): Promise<void> {
    const { id, ...todoData } = todo;
    await query('UPDATE Todo SET ? WHERE id = ? LIMIT 1', [todoData, id]);
}