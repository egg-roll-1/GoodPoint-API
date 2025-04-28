import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VolunteerRequestResponse } from '../dto/response/volunteer-request.response';
import { VolunteerRequestService } from '../service/volunteer-request.service';

@ApiBearerAuth()
@ApiTags('VolunteerRequest API')
@Controller('/volunteer-request')
export class VolunteerRequestController {
  constructor(
    private readonly volunteerRequestService: VolunteerRequestService,
  ) {}

  @ApiOperation({ summary: '봉사활동 신청 취소' })
  @Delete('/:id')
  async cancelRequest(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') id: number,
  ) {
    const { id: userId } = tokenUser;
    await this.volunteerRequestService.cancel(userId, id);
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
