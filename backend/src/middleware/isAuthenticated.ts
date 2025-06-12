import { Request, Response, NextFunction } from 'express';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const currentUserId = req.session.userId as string;
  const requestedId = req.params.id;

  if (!currentUserId) {
    res.status(401).json({
      status: '401',
      message: 'Unauthorized. Please log in.',
    });
  }

  if (requestedId && currentUserId !== requestedId) {
    res.status(403).json({
      status: '403',
      message: 'You are not allowed to perform this action.',
    });
  }

  next();
}
