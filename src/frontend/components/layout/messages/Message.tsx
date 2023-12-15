import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default (props: { text: string, onClose: () => void, }) => {
    const [show, setShow] = useState(true);
    const onClose = () => {
        setShow(false);
        props.onClose();
    };
    return (
        <Toast {...{ show, onClose }} delay={3000} autohide>
            <Toast.Header>!</Toast.Header>
            <Toast.Body>{props.text}</Toast.Body>
        </Toast>
    );
};