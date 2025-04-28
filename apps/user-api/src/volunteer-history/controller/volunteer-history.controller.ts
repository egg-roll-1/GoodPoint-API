import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VolunteerHistoryResponse } from '../dto/response/volunteer-history.response';
import { VolunteerHistoryService } from '../service/volunteer-history.service';

@ApiBearerAuth()
@ApiTags('VolunteerHistory API')
@Controller('/volunteer-history')
export class VolunteerHistoryController {
  constructor(
    private readonly volunteerHistoryService: VolunteerHistoryService,
  ) {}

  @ApiOperation({ summary: '활동(출석) 내역 조회' })
  @Get()
  public async getHistory(@SignedUser() tokenUser: TokenUserDto) {
    const { id: userId } = tokenUser;
    const historyList = await this.volunteerHistoryService.findHistory(userId);
    return await VolunteerHistoryResponse.fromArray(historyList);
  }
}
