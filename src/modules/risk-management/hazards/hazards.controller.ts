import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { HazardsService } from './hazards.service';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import * as tenantPermissionsGuard from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { Hazard } from './hazard.entity';
import { plainToInstance } from 'class-transformer';
import { CreateOrUpdateHazardDto } from './dtos/create-or-update.dto';

@Controller({
  path: 'hazards',
  version: '1',
})
export class HazardsController {
  constructor(private readonly service: HazardsService) {}

  @Get()
  @RequirePermissions('view:hazards:own-company')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ) {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }
    return await this.service.findAllForTenant(
      {
        ...query,
        parsedFilters,
      },
      req.tenantId,
    );
  }

  @Put(':id')
  @RequirePermissions('save:hazards:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateHazardDto,
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ): Promise<ServicePayload<Hazard>> {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    const hazard = plainToInstance(Hazard, dto, {
      ignoreDecorators: true,
    });
    hazard.id = params.id;
    hazard.companyId = req.tenantId;

    return {
      detail: 'Peligro guardado correctamente.',
      data: await this.service.save(hazard),
    };
  }
}
