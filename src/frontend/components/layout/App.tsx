import React, { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/style.scss';
import Loading from '../reused/Loading';
import Header from './Header';
import Messages from './messages/Messages';
import useCheckUser from '../hooks/useCheckUser';
import useCheckTodosCount from '../hooks/useCheckTodosCount';

const Todos = lazy(() => import('../Todos/Todos'));

export default React.memo(() => {
    const { user } = useCheckUser();
    useCheckTodosCount();

    if (user === undefined) return <Loading />;
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header />
                <Todos />
                <Messages />
            </Suspense>
        </>
    );
});