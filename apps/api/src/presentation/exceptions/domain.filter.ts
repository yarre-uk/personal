import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { DomainException, TodoExceptionCode } from '~/domain/exceptions';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.mapDomainExceptionToHttpStatus(exception.code);

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      code: exception.code,
      timestamp: new Date().toISOString(),
      details: exception.details,
    };

    this.logger.error(
      `Domain exception: ${exception.code} - ${exception.message}`,
      exception.stack
    );

    response.status(status).json(errorResponse);
  }

  private mapDomainExceptionToHttpStatus(code: string): number {
    const statusMap: Record<TodoExceptionCode, number> = {
      [TodoExceptionCode.TODO_NOT_FOUND]: HttpStatus.NOT_FOUND,
      [TodoExceptionCode.TODO_ALREADY_COMPLETED]: HttpStatus.CONFLICT,
      [TodoExceptionCode.TODO_ALREADY_INCOMPLETE]: HttpStatus.CONFLICT,
      [TodoExceptionCode.INVALID_TODO_TITLE]: HttpStatus.BAD_REQUEST,
    };

    return statusMap[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
