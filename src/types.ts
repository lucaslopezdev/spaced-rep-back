import { Request, Response, NextFunction } from 'express';

export interface ErrorHandlerMiddleware {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}