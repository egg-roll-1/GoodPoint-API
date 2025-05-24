import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatchAgencyRequest } from '../dto/request/patch.request';
import { PostAgencyRequest } from '../dto/request/post.request';
import { AgencyResponse } from '../dto/response/agency.response';
import { AgencyService } from '../service/agency.service';

@ApiBearerAuth()
@ApiTags('Agency API')
@Controller('/agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @ApiOperation({ summary: '봉사기관 수정' })
  @Patch('/:agencyId')
  public async patchAgency(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('agencyId') agencyId: number,
    @Body() request: PatchAgencyRequest,
  ) {
    const { id: managerId } = tokenUser;
    await this.agencyService.patchAgency(managerId, agencyId, request);
  }

  @ApiOperation({ summary: '봉사기관 단일 조회' })
  @Get('/:agencyId')
  public async getAgencyDetail(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('agencyId') agencyId: number,
  ) {
    const { id: managerId } = tokenUser;
    const agency = await this.agencyService.getAgencyDetail(
      managerId,
      agencyId,
    );

    return AgencyResponse.from(agency);
  }

  @ApiOperation({ summary: '봉사기관 등록' })
  @Post()
  public async registerAgency(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PostAgencyRequest,
  ) {
    const { id: managerId } = tokenUser;
    const agency = await this.agencyService.registerAgency(managerId, request);
    return agency.id;
  }

  @ApiOperation({ summary: '봉사기관 조회' })
  @Get()
  public async getAgencyList(@SignedUser() tokenUser: TokenUserDto) {
    const { id: managerId } = tokenUser;
    const agencyList = await this.agencyService.getAgencyList(managerId);
    return AgencyResponse.fromArray(agencyList);
  }
}
