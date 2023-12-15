import { AnySchema } from 'yup';

export default function(data: any, schema: AnySchema): [boolean, string?] {
    try {
        schema.validateSync(data, { strict: true, });
        return [true];
    }
    catch (error: any) {
        return [false, error.message()];
    }
}