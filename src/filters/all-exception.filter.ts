import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let resBody: any = {
			timestamp: new Date().toISOString(),
		};

		if (exception?.isAxiosError) {
			const axiosRes = exception?.response;
			status = axiosRes?.status;
			resBody = {
				...resBody,
				statusCode: status,
				path: axiosRes?.config?.url,
				message: axiosRes?.data,
			};
			console.error(resBody);
		} else {
			resBody = {
				...resBody,
				statusCode: status,
				path: request?.url,
				message: exception?.message || 'Internal Server Error',
			};
			console.error(resBody);
		}
		if (response?.status) {
			// Restful context requires us to set on the response object
			response.status(status).json(resBody);
		} else {
			// GraphQL context expects exception to be returned
			return exception;
		}
	}
}
