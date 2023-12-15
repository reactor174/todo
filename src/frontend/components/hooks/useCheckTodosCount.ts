import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useGetTodosCountMutation } from '../../store/api/todo';
import { setTodosCount } from '../../store/slices/todo';

export default () => {
    const dispatch = useAppDispatch();

    const [getTodosCount] = useGetTodosCountMutation();

    const checkTodosCount = async () => {
        try {
            const res = await getTodosCount();
            if ('data' in res) {
                dispatch(setTodosCount(res.data));
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        checkTodosCount();
    }, []);
};

