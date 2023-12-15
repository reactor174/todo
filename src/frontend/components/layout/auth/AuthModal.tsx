import React, { lazy, useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getAuthModalVisible, hideAuthModal } from '../../../store/slices/app';
const Login = lazy(() => import('./Login'));

export default () => {
    const authModalVisible = useAppSelector(getAuthModalVisible);

    const [initialized, setInitialized] = useState<boolean>(false);
    useEffect(() => {
        setInitialized(true);
    }, []);

    const dispatch = useAppDispatch();
    const closeModal = useCallback(() => {
        dispatch(hideAuthModal());
    }, []);

    return (
        <Modal
            centered
            show={authModalVisible}
            onHide={closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    initialized
                    &&
                    <Login />
                }
            </Modal.Body>
        </Modal>
    );
};