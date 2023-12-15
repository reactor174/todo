import * as yup from 'yup';
import validator from 'validator';

export const flagSchema = yup.number().oneOf([ 0, 1 ]);

export const idSchema = yup.number().positive();

export const emailSchema = yup.string()
    .test('Email is not valid', (value) => validator.isEmail(value));

export const userNameSchema = yup.string()
    .min(3, 'Username is too short')
    .max(32, 'Username is too long');

export const passwordSchema = yup.string()
    .min(3, 'Password is too short')
    .max(16, 'Password is too long');