import React, { lazy, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearCurrentUser, getCurrentUser } from '../../../store/slices/user';
import Button from 'react-bootstrap/Button';
import { showAuthModal } from '../../../store/slices/app';
import { useLogoutMutation } from '../../../store/api/auth';

const AuthModal = lazy(() => import('./AuthModal'));

export default () => {
    const user = useAppSelector(getCurrentUser);

    const dispatch = useAppDispatch();
    const openModal = useCallback(() => {
        dispatch(showAuthModal());
    }, []);

    const [logout] = useLogoutMutation();
    const disempowerUser = async (): Promise<void> => {
        const logoutResult = await logout();
        if ('data' in logoutResult) {
            if (logoutResult.data === true) {
                dispatch(clearCurrentUser());
            }
        }
    };

    return (
        <>
            {
                !user
                    ?
                    <>
                        <Button
                            variant="primary"
                            onClick={openModal}
                            children={'Login'}
                        />
                        <AuthModal />
                    </>
                    :
                    <Button
                        variant="link"
                        onClick={disempowerUser}
                        children={'Logout'}
                    />
            }
        </>
    );
};