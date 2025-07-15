import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const user_role = req.session.userRole;

  // @ts-ignore
  const user_id = req.session.userId;

  if (!user_id || user_role !== 'admin') {
    res.status(403).json({
      status: '403',
      message: 'Access denied',
    });
    return;
  }

  next();
}
