import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { PatchManagerRequest } from '../dto/request/user.request';
import { UserResponse } from '../dto/response/user.response';
import { ManagerService } from '../service/user.service';

@ApiBearerAuth()
@ApiTags('User API')
@Controller('/user')
export class UserController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('')
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiResponse({ type: () => UserResponse })
  async getProfile(@SignedUser() tokenUser: TokenUserDto) {
    const { id } = tokenUser;
    const user = await this.managerService.getUserProfile(id);
    return UserResponse.from(user);
  }

  @Patch('')
  @ApiOperation({ summary: '사용자 프로필 수정' })
  async patchProfile(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PatchManagerRequest,
  ) {
    const { id } = tokenUser;
    await this.managerService.patchUserProfile(id, request);
  }
}
