import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './companies.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@common/utils/services/base-crud.service';

@Injectable()
export class CompaniesService extends BaseCrudService<Company> {
  constructor(@InjectRepository(Company) repository: Repository<Company>) {
    super(repository);
  }
}
