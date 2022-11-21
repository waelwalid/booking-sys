import { Service } from 'typedi';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Line } from '../entities/Line';
import { AppDataSource } from '../utility/data-source';

@Service()
export class LineService {
  private readonly lineRepo: Repository<Line>;

  constructor() {
    this.lineRepo = AppDataSource.getRepository(Line);
  }

  async find(criteria: object) {
    const lines = await this.lineRepo.find(criteria as FindManyOptions);
    return lines;
  }

  async findOne(criteria: object) {
    const line = await this.lineRepo.findOne(criteria as FindOneOptions);
    return line;
  }
}
