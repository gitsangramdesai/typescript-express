import HttpException from '../exceptions/HttpException';
import { Test } from '../interfaces/test.interface';
import testModel from '../models/test.model';
import { isEmptyObject } from '../utils/util';

class TestService {
  public tests = testModel;

  public async findAll(): Promise<Test[]> {
    const all: Test[] = await this.tests.findAll();
    return all;
  }
}

export default TestService;
