import React, { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Auth from './auth/Auth';

export default React.memo(() => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Todo</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Suspense>
                        <Auth />
                    </Suspense>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});