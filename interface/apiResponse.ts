export interface INestError {
    statusCode: number;
    message: string | string[];
    error: string;
}