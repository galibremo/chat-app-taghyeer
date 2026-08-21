export type ApiErrorPayload = {
  statusCode: number;
  code: string;
  error?: string;
  message: string;
  meta?: Record<string, unknown>;
  timestamp?: string;
  path?: string;
  requestId?: string;
};

export class ApiError extends Error {
  constructor(
    public readonly payload: ApiErrorPayload,
    public readonly statusCode: number,
  ) {
    super(payload.message);
    this.name = "ApiError";
  }

  get code(): string {
    return this.payload.code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function getMeta(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined;
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof Error) {
    // If it's a TypeError like 'Failed to fetch' we can treat it as a network error
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      return new ApiError(
        {
          statusCode: 0,
          code: "network_error",
          message: "Unable to connect to the server. Please check your internet connection.",
        },
        0,
      );
    }

    return new ApiError(
      {
        statusCode: 500,
        code: "unknown_error",
        message: error.message,
      },
      500,
    );
  }

  return new ApiError(
    {
      statusCode: 500,
      code: "unknown_error",
      message: "Request failed. Please try again.",
    },
    500,
  );
}
