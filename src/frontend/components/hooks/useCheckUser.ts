import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentUser, setCurrentUser } from '../../store/slices/user';
import { useGetSessionUserMutation } from '../../store/api/auth';
import { showAuthModal } from '../../store/slices/app';

export default (check: boolean = true) => {
    const dispatch = useAppDispatch();

    const [getSessionUser] = useGetSessionUserMutation();

    const checkUser = async (showAuth: boolean = false) => {
        try {
            const res = await getSessionUser();
            if ('data' in res) {
                dispatch(setCurrentUser(res.data));
            }
            else {
                if (showAuth) {
                    dispatch(showAuthModal());
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (check) checkUser();
    }, []);

    const user = useAppSelector(getCurrentUser);
    return { user, checkUser };
};

