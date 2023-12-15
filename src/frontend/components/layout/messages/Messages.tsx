import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getMessages, removeMessage } from '../../../store/slices/app';
import Message from './Message';

export default () => {
    const messages = useAppSelector(getMessages);

    const dispatch = useAppDispatch();
    const endMessage = (index: number) => {
        dispatch(removeMessage(index));
    };

    return (
        <div id="messages">
            {
                messages.map((message, i) => (
                    <Message
                        key={i}
                        text={message}
                        onClose={() => endMessage(i)}
                    />
                ))
            }
        </div>
    );
};