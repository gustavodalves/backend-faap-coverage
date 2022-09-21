import httpStatus from '../utils/httpStatus';
import IValidate from '../interfaces/Validate';

export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string | IValidate[], statusCode: number) {
        super(typeof message === 'string' ? message : JSON.stringify(message));
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.badRequest);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.unauthorized);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.forbidden);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.notFound);
    }
}

export class NotAcceptableError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.notAcceptable);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.conflict);
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.unprocessableEntity);
    }
}

export class BadGatewayError extends ApiError {
    constructor(message: string | IValidate[]) {
        super(message, httpStatus.badGateway);
    }
}
