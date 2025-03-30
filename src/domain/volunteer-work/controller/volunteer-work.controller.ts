import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/domain/auth/decorator/public.decorator';
import { ApiPaginatedResponse } from 'src/global/decorator/swagger-paging-response.decorator';
import { GetVolunteerRequest } from '../dto/request/query.request';
import { VolunteerWorkResponse } from '../dto/response/volunteer-work.response';
import { VolunteerWorkService } from '../service/volunteer-work.service';

@ApiTags('봉사활동 API')
@Controller('/volunteer-work')
export class VolunteerWorkController {
  constructor(private readonly volunteerWorkService: VolunteerWorkService) {}

  @ApiOperation({ summary: '봉사활동 목록을 조회합니다.' })
  @ApiPaginatedResponse(VolunteerWorkResponse)
  @Public()
  @Get('')
  async getVolunteerWorkList(@Query() request: GetVolunteerRequest) {
    const result = await this.volunteerWorkService.searchList(request);
    return result.setContent(
      await VolunteerWorkResponse.fromArray(result.content),
    );
  }
}
