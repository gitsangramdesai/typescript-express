import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import userModel from '../models/users.model';

async function tokenMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (token) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const userId = verificationResponse.id;
      const ts = verificationResponse.ts;

      /*token expiry */
      const cts: number = new Date().getTime();
      const min: number = (cts - ts) / (60 * 1000);

      console.log('token time:' + min.toString());

      if (min > parseInt(process.env.TOKEN_EXPIRY_MIN)) {
        next(new HttpException(401, 'authentication token expired'));
      } else {
        const findUser = await userModel.findByPk(userId);
        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } else {
    next(new HttpException(404, 'Authentication token missing'));
  }
}

export default tokenMiddleware;
