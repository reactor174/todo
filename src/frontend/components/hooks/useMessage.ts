import { useAppDispatch } from '../../store/hooks';
import { addMessage } from '../../store/slices/app';

export default () => {
    const dispatch = useAppDispatch();

    return (text: string) => {
        dispatch(addMessage(text));
    };
};