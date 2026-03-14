import { Request, Response, NextFunction } from 'express';
import { ImageQuery } from '../types/index.js';

const validateImageQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { filename, width, height } = req.query as unknown as ImageQuery;

  if (!filename) {
    res.status(400).send('Missing required query parameter: filename');
    return;
  }

  if (width && (isNaN(Number(width)) || Number(width) <= 0)) {
    res.status(400).send('Width must be a positive number');
    return;
  }

  if (height && (isNaN(Number(height)) || Number(height) <= 0)) {
    res.status(400).send('Height must be a positive number');
    return;
  }

  next();
};

export default validateImageQuery;
