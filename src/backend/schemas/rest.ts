import * as yup from 'yup';
import { emailSchema, flagSchema, idSchema, passwordSchema, userNameSchema } from './basic';

export const getTodosParamsSchema = yup.object().shape({
    currentPageNumber: yup.number(),
    itemsPerPageCount: yup.number().positive().required(),
    sortingField: yup.string().oneOf(['id', 'userName', 'eMail', 'isCompleted', 'isModified']).required(),
    sortingOrder: yup.string().oneOf(['asc', 'desc']).required(),
});

export const addTodoParamsSchema = yup.object().shape({
    userName: userNameSchema.required(),
    eMail: emailSchema.required(),
    text: yup.string().required()
        .min(3, 'Text is too short')
        .max(1024, 'Text is too long'),
});

export const updateTodoParamsSchema = addTodoParamsSchema.shape({
    id: idSchema,
    isCompleted: flagSchema.required(),
    isModified: flagSchema.required(),
});

export const autorizeUserParamsSchema = yup.object().shape({
    userName: userNameSchema.required(),
    password: passwordSchema.required(),
});