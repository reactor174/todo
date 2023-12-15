import React from 'react';
import Form from 'react-bootstrap/Form';

interface FormItemProps<
    T extends string | number | string[] = string,
    H extends React.ChangeEventHandler<any> = React.ChangeEventHandler<any>
> {
    title: string;
    showLabel?: true;
    name: string;
    type?: 'text' | 'password' | 'textarea';
    value: T;
    onChange: H;
    error?: string;
}

export default <
    T extends string | number | string[] = string,
    H extends React.ChangeEventHandler<any> = React.ChangeEventHandler<any>
>(props: FormItemProps<T, H>) => {
    const { title, showLabel, name, value, onChange, error } = props;
    const type = props.type || 'text';

    const isInvalid = !!error;

    return (
        <Form.Group>
            {
                showLabel
                &&
                <Form.Label>{title}</Form.Label>
            }
            <Form.Control
                {...{ name, value, onChange, isInvalid }}
                placeholder={title}
                {...(
                    type !== 'textarea'
                        ? { type }
                        : { as: 'textarea' }
                )}

            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
};