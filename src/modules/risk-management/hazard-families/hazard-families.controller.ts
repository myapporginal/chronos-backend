import { Controller, Get, Query } from '@nestjs/common';
import { HazardFamiliesService } from './hazard-families.service';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { HazardFamily } from './hazard-family.entity';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';

@Controller({
  path: 'hazard-families',
  version: '1',
})
export class HazardFamiliesController {
  constructor(private readonly hazardFamiliesService: HazardFamiliesService) {}

  @Get()
  @RequirePermissions('show:hazard-families')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
  ): Promise<PaginatedResponse<HazardFamily>> {
    return this.hazardFamiliesService.findAll({
      ...query,
      parsedFilters,
    });
  }
}
