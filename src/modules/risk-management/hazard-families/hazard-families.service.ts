import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HazardFamily } from './hazard-family.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HazardFamiliesService extends BaseCrudService<HazardFamily> {
  constructor(
    @InjectRepository(HazardFamily) repository: Repository<HazardFamily>,
  ) {
    super(repository);
  }
}
