import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: 'You have sent too many requests, please try again later .',
  statusCode: 409,
  headers: true,
});

export default rateLimiter;
