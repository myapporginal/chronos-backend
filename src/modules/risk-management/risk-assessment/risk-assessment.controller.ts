import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { RiskAssessmentService } from './risk-assessment.service';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import * as tenantPermissionsGuard from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import { plainToInstance } from 'class-transformer';
import { RiskAssessment } from './risk-assessment.entity';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { CreateOrUpdateRiskAssessmentDto } from './dtos/create-or-update.dto';

@Controller({ path: 'risk-assessment', version: '1' })
export class RiskAssessmentController {
  constructor(private readonly service: RiskAssessmentService) {}

  @Get()
  @RequirePermissions('view:risk-assessment:own-company')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ) {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }
    return await this.service.findAllForTenant(
      { ...query, parsedFilters },
      req.tenantId,
    );
  }

  @Put(':id')
  @RequirePermissions('save:risk-assessment:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateRiskAssessmentDto,
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ): Promise<ServicePayload<RiskAssessment>> {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    const riskAssessment = plainToInstance(RiskAssessment, dto, {
      ignoreDecorators: true,
    });

    riskAssessment.id = params.id;
    riskAssessment.companyId = req.tenantId;

    return {
      detail: `La evaluacion de riesgo ha sido guardada exitosamente.`,
      data: await this.service.save(riskAssessment),
    };
  }
}
