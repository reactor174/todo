export interface Todo {
    id: number;
    userName: string;
    eMail: string;
    text: string;
    isCompleted: 0 | 1;
    isModified: 0 | 1;
}

export type AddTodoParams = Pick<Todo, 'userName' | 'eMail' | 'text'>;

interface ProcessStatusOk {
    status: 'ok';
}
interface ProcessStatusBad {
    status: 'bad';
    error: string;
}
export type ProcessStatus = ProcessStatusOk | ProcessStatusBad;

export interface AuthRequest {
    userName: string;
    password: string;
}

interface AuthStatusOk extends ProcessStatusOk {
    user: string;
}
export type AuthStatus = AuthStatusOk | ProcessStatusBad;

export interface AppState {
    authModalVisible: boolean;
    messages: string[];
}

export interface UserState {
    user: undefined | null | string;
}

export type SortingField = keyof Pick<Todo, 'id' | 'userName' | 'eMail' | 'isCompleted' | 'isModified'>;

export interface TodoState {
    todosCount: number,
    currentPageNumber: number;
    itemsPerPageCount: number;
    sortingField: SortingField;
    sortingOrder: 'asc' | 'desc';
}

export type TodosQueryParams = Omit<TodoState, 'todosCount' |'currentPageNumber'> & Partial<Pick<TodoState, 'currentPageNumber'>>;

