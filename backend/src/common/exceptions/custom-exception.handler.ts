import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionHandler implements ExceptionFilter {
  private logger = new Logger('CustomExceptionHandler');
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = exception.getStatus();
    this.logger.error('CustomExceptionHandler', { exception });
    return response.status(status).json({ message, status });
  }
}
