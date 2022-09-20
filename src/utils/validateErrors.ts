import { ValidationError } from 'class-validator';
import IValidate from '../interfaces/Validate';

const errorsMessage = (errors: ValidationError[]): IValidate[] => errors.map((item: ValidationError) => {
    const { property, constraints } = item;
    const messages = Object.values(constraints!);
    return {
        property,
        messages,
    };
});

export default errorsMessage;
