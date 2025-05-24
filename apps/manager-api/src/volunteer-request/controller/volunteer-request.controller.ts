import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetVolunteerRequestQuery } from '../dto/request/query.request';
import { VolunteerRequestResponse } from '../dto/response/volunteer-request.response';
import { VolunteerRequestService } from '../service/volunteer-request.service';

@ApiBearerAuth()
@ApiTags('VolunteerRequest API')
@Controller('/volunteer-request')
export class VolunteerRequestController {
  constructor(
    private readonly volunteerRequestService: VolunteerRequestService,
  ) {}

  @ApiOperation({ summary: '봉사신청 거절' })
  @Post('/:id/reject')
  public async rejectRequestDecision(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') id: number,
  ) {
    const { id: userId } = tokenUser;
    await this.volunteerRequestService.rejectRequest(userId, id);
  }

  @ApiOperation({ summary: '봉사신청 수락' })
  @Post('/:id/approve')
  public async approveRequestDecision(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') id: number,
  ) {
    const { id: userId } = tokenUser;
    await this.volunteerRequestService.approveRequest(userId, id);
  }

  @ApiOperation({ summary: '봉사신청 조회' })
  @Get('')
  public async getVolunteerRequest(
    @SignedUser() tokenUser: TokenUserDto,
    @Query() request: GetVolunteerRequestQuery,
  ) {
    const { id: userId } = tokenUser;
    const result = await this.volunteerRequestService.getVolunteerRequest(
      userId,
      request,
    );
    return await VolunteerRequestResponse.fromArray(result);
  }
}
