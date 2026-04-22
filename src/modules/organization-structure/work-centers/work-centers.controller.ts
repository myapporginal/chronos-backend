import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { WorkCentersService } from './work-centers.service';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import * as tenantPermissionsGuard from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { plainToInstance } from 'class-transformer';
import { CreateOrUpdateWorkCenterDto } from './dtos/create-or-update.dto';
import { WorkCenter } from './work-center.entity';

@Controller({
  path: 'work-centers',
  version: '1',
})
export class WorkCentersController {
  constructor(private readonly service: WorkCentersService) {}

  @Get()
  @RequirePermissions('view:work-centers:own-company')
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
  @RequirePermissions('save:work-centers:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateWorkCenterDto,
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ): Promise<ServicePayload<WorkCenter>> {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    const workCenter = plainToInstance(WorkCenter, dto, {
      ignoreDecorators: true,
    });
    workCenter.id = params.id;
    workCenter.companyId = req.tenantId;

    return {
      detail: 'Centro de trabajo guardado correctamente.',
      data: await this.service.save(workCenter),
    };
  }
}
