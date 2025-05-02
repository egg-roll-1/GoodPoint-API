import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@core/application/auth/decorator/public.decorator';
import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { ApiPaginatedResponse } from '@core/global/decorator/swagger-paging-response.decorator';
import { GetVolunteerRequest } from '../dto/request/query.request';
import { VolunteerWorkResponse } from '../dto/response/volunteer-work.response';
import { VolunteerWorkService } from '../service/volunteer-work.service';

@ApiTags('VolunteerWork API')
@Controller('/volunteer-work')
export class VolunteerWorkController {
  constructor(private readonly volunteerWorkService: VolunteerWorkService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '봉사활동을 신청합니다.' })
  @Post('/:id')
  async requestVolunteerRequest(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') id: number,
  ) {
    const { id: userId } = tokenUser;
    await this.volunteerWorkService.applyVolunteer(userId, id);
  }

  @ApiOperation({ summary: '봉사활동을 조회합니다.' })
  @Public()
  @Get('/:id')
  async getVolunteerWork(@Param('id') id: number) {
    const result = await this.volunteerWorkService.getDetail(id);
    return await VolunteerWorkResponse.from(result);
  }

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
