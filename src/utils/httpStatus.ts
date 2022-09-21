interface IHttpStatus {
    [key: string]: number
}

const httpStatus: IHttpStatus = {
    ok: 200,
    created: 201,
    acceptd: 202,
    nonAuthoritativeInformation: 203,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    notAcceptable: 406,
    conflict: 409,
    unprocessableEntity: 422,
    internalServerError: 500,
    badGateway: 502,
};

export default httpStatus;
