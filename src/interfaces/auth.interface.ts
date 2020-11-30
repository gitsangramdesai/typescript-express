import { Request } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  id: number;
  ts: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
