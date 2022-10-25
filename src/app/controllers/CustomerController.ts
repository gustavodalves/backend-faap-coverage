import { Request, Response } from 'express';

import { validate, ValidationError } from 'class-validator';
import { BadRequestError } from '../../helpers/ApiError';

import errorsMessage from '../../utils/validateErrors';
import customerRepository from '../../repositories/customerRepository';
import httpStatus from '../../utils/httpStatus';

class CustomerController {
    public async store(req: Request, res: Response) {
        const { email, name, subject, message } = req.body;

        const customer = customerRepository.create({ email, name, subject, message });
        const errors: ValidationError[] = await validate(customer);

        if(errors.length > 0) {
            throw new BadRequestError(errorsMessage(errors));
        }

        const customerCreated = await customerRepository.save(customer);

        if(customerCreated) {
            return res.status(httpStatus.created).json(customer);
        }

        throw new BadRequestError('not possible create customer');
    }

    public async index(req: Request, res: Response) {
        const allCustomerMessage = await customerRepository.find();
        return res.status(httpStatus.ok).send(allCustomerMessage);
    }
}

export default new CustomerController();
