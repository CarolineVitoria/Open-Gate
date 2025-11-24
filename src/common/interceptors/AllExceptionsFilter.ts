import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // erro default
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || message;
    } else if (exception instanceof QueryFailedError) {
      const err: any = exception;
      if (err.code === '23505') {
        status = HttpStatus.BAD_REQUEST;

        const match = err.detail?.match(/\((.*?)\)=\((.*?)\)/);
        if (match) {
          const field = match[1];
          const value = match[2];
          message = `O valor '${value}' já está em uso para o campo '${field}'.`;
        } else {
          message = 'Valor duplicado. Já existe registro com esse dado.';
        }
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
