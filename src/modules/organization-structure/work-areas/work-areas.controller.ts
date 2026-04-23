import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import type { RequestWithUser } from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { WorkAreasService } from './work-areas.service';
import { WorkArea } from './work-area.entity';
import { CreateOrUpdateWorkAreaDto } from './dtos/create-or-update.dto';

@Controller({
  path: 'work-areas',
  version: '1',
})
export class WorkAreasController {
  constructor(private readonly service: WorkAreasService) {}

  @Get()
  @RequirePermissions('view:work-areas:own-company')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
    @Request() req: RequestWithUser,
  ): Promise<PaginatedResponse<WorkArea>> {
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
  @RequirePermissions('save:work-areas:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateWorkAreaDto,
    @Request() req: RequestWithUser,
  ): Promise<ServicePayload<WorkArea>> {
    if (!req.tenantId) {
      throw new Error('Tenant ID is required');
    }

    const workArea = plainToInstance(WorkArea, dto, {
      ignoreDecorators: true,
    });
    workArea.id = params.id;

    return {
      detail: 'Área de trabajo guardada correctamente.',
      data: await this.service.saveForTenant(workArea, req.tenantId),
    };
  }
}
