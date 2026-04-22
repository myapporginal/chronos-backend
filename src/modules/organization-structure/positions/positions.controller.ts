import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreateOrUpdatePositionDto } from './dtos/create-or-update.dto';
import { Position } from './position.entity';
import { plainToInstance } from 'class-transformer';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import type { RequestWithUser } from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';

@Controller({
  path: 'positions',
  version: '1',
})
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  @RequirePermissions('view:positions:own-company')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
    @Request() req: RequestWithUser,
  ): Promise<PaginatedResponse<Position>> {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    return await this.positionsService.findAllForTenant(
      {
        ...query,
        parsedFilters,
      },
      req.tenantId,
    );
  }

  @Put(':id')
  @RequirePermissions('save:positions:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdatePositionDto,
    @Request() req: RequestWithUser,
  ): Promise<ServicePayload<Position>> {
    if (!req.tenantId) {
      throw new Error('Tenant ID is required');
    }

    const position = plainToInstance(Position, dto, {
      ignoreDecorators: true,
    });
    position.id = params.id;

    return {
      detail: 'Cargo guardado correctamente.',
      data: await this.positionsService.saveForTenant(position, req.tenantId),
    };
  }
}
