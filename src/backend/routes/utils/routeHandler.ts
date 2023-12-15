import { Response } from 'express';
import { AnySchema } from 'yup';
import dataValidator from './dataValidator';

export default async function(
    res: Response,
    validation: [ any, AnySchema ] | null,
    code: () => Promise<any>
): Promise<void> {
    try {
        if (validation) {
            const [ data, schema ] = validation;
            const [ isValid, validationError ] = dataValidator(data, schema);
            if (!isValid) {
                console.error(validationError);
                res.sendStatus(400);
                return;
            }
        }
    
        await code();
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.toString(), });
    }
}