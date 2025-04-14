import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VolunteerHistoryService } from '../service/volunteer-history.service';

@ApiBearerAuth()
@ApiTags('봉사활동 출석부 API')
@Controller('/volunteer-history')
export class VolunteerHistoryController {
  constructor(
    private readonly volunteerHistoryService: VolunteerHistoryService,
  ) {}

  @ApiOperation({ summary: '출석내역 조회' })
  @Get()
  async getHistory() {
    /** todo */
  }
}
