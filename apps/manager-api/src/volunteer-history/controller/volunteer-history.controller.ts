import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostVolunteerHistoryRequest } from '../dto/request/post.request';
import { GetVolunteerHistoryRequest } from '../dto/request/query.request';
import { VolunteerHistoryResponse } from '../dto/response/volunteer-history.response';
import { VolunteerHistoryService } from '../service/volunteer-history.service';

@ApiBearerAuth()
@ApiTags('VolunteerHistory API')
@Controller('/volunteer-history')
export class VolunteerHistoryController {
  constructor(
    private readonly volunteerHistoryService: VolunteerHistoryService,
  ) {}

  @ApiOperation({ summary: '출석삭제' })
  @Delete('/:id')
  public async removeHistory(
    @SignedUser() tokenUser: TokenUserDto,
    @Param('id') id: number,
  ) {
    const { id: managerId } = tokenUser;
    await this.volunteerHistoryService.removeHistory(managerId, id);
  }

  @ApiOperation({ summary: '출석처리' })
  @Post()
  public async postHistory(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PostVolunteerHistoryRequest,
  ) {
    const { id: managerId } = tokenUser;
    await this.volunteerHistoryService.handleHistory(managerId, request);
  }

  @ApiOperation({ summary: '출석내역 조회' })
  @Get()
  public async getHistory(
    @SignedUser() tokenUser: TokenUserDto,
    @Query() request: GetVolunteerHistoryRequest,
  ) {
    const { id: userId } = tokenUser;
    const historyList = await this.volunteerHistoryService.findHistory(
      userId,
      request,
    );
    return VolunteerHistoryResponse.fromArray(historyList);
  }
}
