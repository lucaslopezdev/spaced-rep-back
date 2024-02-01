import { Request, Response, NextFunction } from 'express';

export interface ErrorHandlerMiddleware {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}


export interface ValidateSchema {
  (schema: () => () => string | string[]): () => string | string[];
}

export type LastReview = `${string}-${string}-${string}`

export interface Card {
  card_id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  solution: string
  level: number
  last_review: LastReview
  next_review_interval: number
  user_id: `${string}-${string}-${string}-${string}-${string}`
  album_id: `${string}-${string}-${string}-${string}-${string}`
}

export interface Payload {
  userId: string
}

interface CustomRequest extends Request {
  cookies: {
    [key: string]: string;
  }
  userId?: string;
}