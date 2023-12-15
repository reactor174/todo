export interface Todo {
    id: number;
    userName: string;
    eMail: string;
    text: string;
    isCompleted: 0 | 1;
    isModified: 0 | 1;
}

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

export interface GetTodosRequestParams {
    currentPageNumber?: number;
    itemsPerPageCount: number;
    sortingField: keyof Pick<Todo, 'id' | 'userName' | 'eMail' | 'isCompleted' | 'isModified'>;
    sortingOrder: 'asc' | 'desc';
}