import React, { useState } from 'react';
import { AuthRequest } from '../../../types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import FormItem from '../../reused/FormItem';
import { autorizeUserParamsSchema } from '../../../schemas/rest';
import { useLoginMutation } from '../../../store/api/auth';
import { useAppDispatch } from '../../../store/hooks';
import { setCurrentUser } from '../../../store/slices/user';
import Alert from 'react-bootstrap/Alert';

export default () => {
    const [error, setError] = useState<string | null>(null);

    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const authorizeUser = async (params: AuthRequest): Promise<void> => {
        const authResult = await login(params);
        if ('data' in authResult) {
            if (authResult.data.status === 'ok') {
                dispatch(setCurrentUser(authResult.data.user));
            }
            else {
                setError(authResult.data.error);
            }
        }
    };

    return (
        <Formik<AuthRequest>
            validationSchema={autorizeUserParamsSchema}
            onSubmit={authorizeUser}
            initialValues={{
                userName: '',
                password: '',
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} id="login">
                    <FormItem
                        title="Username"
                        showLabel
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        error={touched.userName && errors.userName}
                    />
                    <FormItem
                        title="Password"
                        type="password"
                        showLabel
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && errors.password}
                    />
                    {
                        error
                        &&
                        <Alert variant="danger">{error}</Alert>
                    }
                    <Button type="submit">Log in</Button>
                </Form>
            )}
        </Formik>
    );
};