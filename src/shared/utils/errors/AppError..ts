export class APIResponse extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public data?: any
    ) {
        super(message);
        this.name = 'APIResponse';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class CreateSuccess extends APIResponse {
    constructor(message: string, data?: any) {
        super(message, 201, data);
    }
}

export class UpdateSuccess extends APIResponse {
    constructor(message: string) {
        super(message, 200);
    }
}

export class DeleteSuccess extends APIResponse {
    constructor(message: string) {
        super(message, 200);
    }
}

export class GetSuccess extends APIResponse {
    constructor(message: string) {
        super(message, 200);
    }
}

export class UnauthorizedError extends APIResponse {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends APIResponse {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFoundError extends APIResponse {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictError extends APIResponse {
    constructor(message: string) {
        super(message, 409);
    }
}

export class InternalServerError extends APIResponse {
    constructor(message: string) {
        super(message, 500);
    }
}

export class BadRequestError extends APIResponse {
    constructor(message: string) {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}