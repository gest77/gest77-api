import * as express from "express";
import { Replacements, __ } from "i18n";
import { VeraLocals } from "../middlewares/middlewareLocals";
import * as yup from "yup";

// TODO : split into generic errors, and Vera Errors.

// Is operator is like a (bool + type matching)
export const isErrorBody = (value: unknown): value is ErrorBody<unknown> => {
    if (!value) return false;
    const converted = value as ErrorBody<unknown>;
    if (!converted || !converted.error || !converted.message || !converted.errorId) return false;
    return true;
};

export interface ErrorBody<T> {
    statusCode: number;
    error: string;
    errorId: string;
    message: string;
    details?: T;
}

export interface ObjectWithStatusCode {
    statusCode: number;
}

// Is operator is like a (bool + type matching)
export const isObjectWithStatusCode = (value: unknown): value is ObjectWithStatusCode => {
    return !!value && !!(value as ObjectWithStatusCode).statusCode;
};

export type ResultWithStatusCode<T> = { result: T; statusCode: number };

export const sendResponse = <T>(result: ResultWithStatusCode<T>, res: express.Response<unknown, VeraLocals>): void => {
    res.status(result.statusCode).json(result.result);
};

export const sendError = <T>(body: ErrorBody<T>, res: express.Response<unknown, VeraLocals>): void => {
    res.status(body.statusCode).json(body);
};

export const yupError = (yupErr: yup.ValidationError, res: express.Response<unknown, VeraLocals>): ErrorBody<Array<{ message: string; errorId: string }>> => {
    // console.log("yup.ValidationError " + JSON.stringify(yupErr, null, 2));

    const translatedErrors = Array<{ message: string; errorId: string }>();

    for (const e of yupErr.inner) {
        translatedErrors.push(parseYupInner(e, res));
    }
    // 2 cases !
    // yup discovered one error, or many

    // many errors case :
    // - multiple error code
    // - add list of errors in details.
    //
    const multipleErrorId = "validation.yup_multiple_errors";

    console.log("translated Errors = " + JSON.stringify(translatedErrors, null, 2));

    return {
        statusCode: 400,
        error: "Bad Request",
        errorId: translatedErrors.length == 1 ? translatedErrors[0].errorId : multipleErrorId,
        message: translatedErrors.length == 1 ? translatedErrors[0].message : res.__(multipleErrorId),
        details: translatedErrors.length == 1 ? undefined : translatedErrors,
    };
};

const parseYupInner = (inner: yup.ValidationError, res: express.Response<unknown, VeraLocals>): { errorId: string; message: string } => {
    let errorId: string = inner?.errors[0];
    let message: string = res.__(inner?.errors[0]);
    const path: string = inner?.params?.path as string | ""; // ugly, but should be ok.

    // Awaited that inner?.errors has always one element !

    if (inner?.type === "oneOf") {
        const values = inner?.params ? (inner?.params.values as string) : "";
        errorId = inner?.errors[0];
        message = res.__(inner?.errors[0], { name: path, values });
    } else if (inner?.type === "invalid" || inner?.type === "validation.invalid") {
        errorId = "validation.invalid";
        message = res.__("validation.invalid", { invalid: path });
    } else if (inner?.type === "required") {
        errorId = "validation.required";
        message = res.__("validation.required", { required: path });
    } else if (inner?.type === "email") {
        errorId = "validation.invalid";
        message = res.__("validation.invalid", { invalid: path });
    } else if (inner?.type === "invalid_date") {
        errorId = "validation.invalid_date";
        message = res.__("validation.invalid_date", { date: path });
    } else {
        errorId = inner?.errors[0];
        message = res.__(inner?.errors[0]);
    }
    return { errorId, message };
};

export const unknownError = (e: unknown, res: express.Response<unknown, VeraLocals>): ErrorBody<unknown> => {
    let statusCode = 500;
    if (isObjectWithStatusCode(e)) {
        statusCode = e.statusCode;
    }
    const errorId = "errors.unknown";
    return {
        statusCode,
        error: "Server Error",
        errorId,
        message: res.__(errorId),
        details: e,
    };
};

export const es5Err = (e: Error, res: express.Response<unknown, VeraLocals>): ErrorBody<Error> => {
    const errorId = "errors.unknown";
    return {
        statusCode: 500,
        error: e.name,
        errorId,
        message: res.__(errorId),
        details: e,
    };
};

export const badRequest = <T>(tradKey: string, details?: T, tradReplacement?: Replacements): ErrorBody<T> => {
    return {
        statusCode: 400,
        error: "Bad Request",
        errorId: tradKey,
        message: tradReplacement ? __(tradKey, tradReplacement) : __(tradKey),
        details: details,
    };
};

export const badClotheImage = <T>(details?: T): ErrorBody<T> => {
    const errorId = "validation.invalid_clothe_image";
    return {
        statusCode: 400,
        error: "Bad Request",
        errorId,
        message: __(errorId),
        details,
    };
};

export const unauthorized = <T>(tradKey?: string, details?: T, tradReplacement?: Replacements): ErrorBody<T> => {
    return {
        statusCode: 401,
        error: "Unauthorized",
        errorId: tradKey ?? "errors.unauthorized",
        message: !tradKey ? __("errors.unauthorized") : tradReplacement ? __(tradKey, tradReplacement) : __(tradKey),
        details: details,
    };
};

export const invalidCredentials = <T>(): ErrorBody<T> => {
    const errorId = "errors.invalid_credentials";
    return {
        statusCode: 400,
        error: "Bad Request",
        errorId,
        message: __(errorId),
    };
};

export const emailUnverified = <T>(): ErrorBody<T> => {
    const errorId = "errors.user.unverified_email";
    return {
        statusCode: 401,
        error: "Unauthorized",
        errorId,
        message: __(errorId),
    };
};
export const accountBlocked = <T>(): ErrorBody<T> => {
    const errorId = "errors.blocked_account";
    return {
        statusCode: 401,
        error: "Unauthorized",
        errorId,
        message: __(errorId),
    };
};

export const shouldResetPassword = <T>(): ErrorBody<T> => {
    const errorId = "errors.user.should_reset_password";
    return {
        statusCode: 401,
        error: "Unauthorized",
        errorId,
        message: __(errorId),
    };
};
export const notFoundError = <T>(): ErrorBody<T> => {
    const errorId = "errors.not_found";
    return {
        statusCode: 404,
        error: "Not Found",
        errorId,
        message: __(errorId),
    };
};
export const notImplemented = <T>(details?: T): ErrorBody<T> => {
    const errorId = "errors.server.not_implemented";
    return {
        statusCode: 500,
        error: "Not implemented",
        errorId,
        message: __(errorId),
        details: details,
    };
};
export const deprecated = <T>(): ErrorBody<T> => {
    const errorId = "errors.server.deprecated";
    return {
        statusCode: 500,
        error: "Not implemented",
        errorId,
        message: __(errorId),
    };
};
export const internalServerError = <T>(tradKey: string, details?: T, tradReplacement?: Replacements): ErrorBody<T> => {
    return {
        statusCode: 500,
        error: "Internal Server Error",
        errorId: tradKey,
        message: tradReplacement ? __(tradKey, tradReplacement) : __(tradKey),
        details: details,
    };
};

export const internalPrismaError = <T>(tradKey: string, details?: T, tradReplacement?: Replacements): ErrorBody<T> => {
    return {
        statusCode: 500,
        error: "Internal Server Error (prisma)",
        errorId: tradKey,
        message: tradReplacement ? __(tradKey, tradReplacement) : __(tradKey),
        details: details,
    };
};

export const serverUnavailable = <T>(tradKey: string, details?: T, tradReplacement?: Replacements): ErrorBody<T> => {
    return {
        statusCode: 503,
        error: "Service Temporarily Unavailable",
        errorId: tradKey,
        message: tradReplacement ? __(tradKey, tradReplacement) : __(tradKey),
        details: details,
    };
};
