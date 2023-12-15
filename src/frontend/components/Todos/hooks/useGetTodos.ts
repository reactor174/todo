import { useGetTodosQuery } from '../../../store/api/todo';
import { useAppSelector } from '../../../store/hooks';
import { getTodosQueryParams } from '../../../store/slices/todo';

export default () => {
    const queryParams = useAppSelector(getTodosQueryParams);
    const { data: todos, refetch: refetchTodos, isLoading } = useGetTodosQuery(queryParams);
    return {
        todos,
        refetchTodos,
        isLoading,
    };
};