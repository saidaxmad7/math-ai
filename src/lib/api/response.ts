import { NextResponse } from "next/server";

type ApiSuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
};

type ApiErrorResponse = {
    success: false;
    message: string;
    errors?: unknown;
};

export function successResponse<T>(
    data: T,
    message = "Request completed successfully.",
    status = 200,
) {
    return NextResponse.json<ApiSuccessResponse<T>>(
        {
            success: true,
            message,
            data,
        },
        {
            status,
        },
    );
}

export function errorResponse(
    message = "Internal Server Error.",
    status = 500,
    errors?: unknown,
) {
    return NextResponse.json<ApiErrorResponse>(
        {
            success: false,
            message,
            errors,
        },
        {
            status,
        },
    );
}

export function validationErrorResponse(errors: unknown) {
    return NextResponse.json<ApiErrorResponse>(
        {
            success: false,
            message: "Validation failed.",
            errors,
        },
        {
            status: 400,
        },
    );
}
