import { Request, Response, NextFunction } from 'express';
import { httpRequestCounter, httpRequestDuration } from '../metrics';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
    end({ method: req.method, route: req.path, status_code: res.statusCode.toString() });
  });
  next();
};
