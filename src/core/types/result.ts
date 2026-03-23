import {HttpStatus} from "./http-statuses";

export enum ResultStatus {
    Success = 'Success',
    Created = 'Created',
    NoContent = 'NoContent',
    NotFound = 'NotFound',
    Forbidden = 'Forbidden',
    Unauthorized = 'Unauthorized',
    BadRequest = 'BadRequest',
    InternalError = 'InternalError',
}

export const resultStatusToHttpStatus: Record<ResultStatus, HttpStatus> = {
    [ResultStatus.Success]: HttpStatus.Ok,
    [ResultStatus.Created]: HttpStatus.Created,
    [ResultStatus.NoContent]: HttpStatus.NoContent,
    [ResultStatus.NotFound]: HttpStatus.NotFound,
    [ResultStatus.Forbidden]: HttpStatus.Forbidden,
    [ResultStatus.Unauthorized]: HttpStatus.Unauthorized,
    [ResultStatus.BadRequest]: HttpStatus.BadRequest,
    [ResultStatus.InternalError]: HttpStatus.InternalServerError,
}

export type ExtensionType = {
    field: string | null;
    message: string;
}

export type Result<T = null> = {
    status: ResultStatus;
    errorMessage?: string;
    extensions: ExtensionType[];
    data: T;
}
