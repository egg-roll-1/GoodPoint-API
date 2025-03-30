import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignedUser } from 'src/domain/auth/decorator/token-user.decorator';
import { TokenUserDto } from 'src/domain/auth/dto/token-user.dto';
import { VolunteerApplyRequest } from '../dto/request/volunteer-request.request';
import { VolunteerRequestResponse } from '../dto/response/volunteer-request.response';
import { VolunteerRequestService } from '../service/volunteer-request.service';

@ApiBearerAuth()
@ApiTags('봉사활동 신청 API')
@Controller('/volunteer-request')
export class VolunteerRequestController {
  constructor(
    private readonly volunteerRequestService: VolunteerRequestService,
  ) {}

  @ApiOperation({ summary: '봉사활동을 신청합니다.' })
  @Post('/:id/apply')
  async requestVolunteerRequest(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: VolunteerApplyRequest,
  ) {
    const { id: userId } = tokenUser;
    await this.volunteerRequestService.applyVolunteer(userId, request);
  }

  @ApiOperation({ summary: '봉사활동 신청내역 조회' })
  @Get('')
  async getMyRequestList(@SignedUser() tokenUser: TokenUserDto) {
    const { id: userId } = tokenUser;
    const result =
      await this.volunteerRequestService.getVolunteerRequestList(userId);
    return VolunteerRequestResponse.fromArray(result);
  }
}
