import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatchVolunteerWorkRequest } from '../dto/request/patch.request';
import { PostVolunteerWorkRequest } from '../dto/request/post.request';
import { GetVolunteerWorkRequest } from '../dto/request/query.request';
import { VolunteerWorkResponse } from '../dto/response/volunteer-work.response';
import { VolunteerWorkService } from '../service/volunteer-work.service';

@ApiTags('봉사활동')
@Controller('volunteer-work')
export class VolunteerWorkController {
  constructor(private readonly volunteerWorkService: VolunteerWorkService) {}

  @ApiOperation({ summary: '봉사활동을 삭제합니다.' })
  @Delete('/:id')
  async removeVolunteerWork(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') volunteerWorkId: number,
  ) {
    const { id: managerId } = tokenUser;
    await this.volunteerWorkService.remove(managerId, volunteerWorkId);
  }

  @ApiOperation({ summary: '봉사활동을 수정합니다.' })
  @Patch('/:id')
  async pathVolunteerWork(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PatchVolunteerWorkRequest,
    @Param('id') volunteerWorkId: number,
  ) {
    const { id: managerId } = tokenUser;
    await this.volunteerWorkService.patch(managerId, volunteerWorkId, request);
  }

  @ApiOperation({ summary: '봉사활동을 등록합니다.' })
  @Post()
  async registerVolunteerWork(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PostVolunteerWorkRequest,
  ) {
    const { id: managerId } = tokenUser;
    await this.volunteerWorkService.register(managerId, request);
  }

  @ApiOperation({ summary: '봉사활동을 조회합니다.' })
  @Get()
  async getVolunteerWorkList(
    @SignedUser() tokenUser: TokenUserDto,
    @Query() request: GetVolunteerWorkRequest,
  ) {
    const { id: managerId } = tokenUser;
    const volunteerWorkList = await this.volunteerWorkService.getList(
      managerId,
      request,
    );

    return VolunteerWorkResponse.fromArray(volunteerWorkList);
  }
}
