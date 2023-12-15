import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default (props: { message?: string }) => {
    const { message } = props;

    return (
        <div className="text-center py-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            {
                !!message
                &&
                <div>{message}</div>
            }
        </div>
    );
};