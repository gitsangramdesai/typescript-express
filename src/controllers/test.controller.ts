import { NextFunction, Request, Response } from 'express';
import { Test } from '../interfaces/test.interface';
import testService from '../services/test.service';

class TestController {
  public testService = new testService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllData: Test[] = await this.testService.findAll();
      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
