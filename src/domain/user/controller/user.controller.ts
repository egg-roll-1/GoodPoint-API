import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignedUser } from 'src/domain/auth/decorator/token-user.decorator';
import { TokenUserDto } from 'src/domain/auth/dto/token-user.dto';
import { UserResponse } from '../dto/response/user.response';
import { UserService } from '../service/user.service';

@ApiBearerAuth()
@ApiTags('User API')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiResponse({ type: () => UserResponse })
  async getProfile(@SignedUser() tokenUser: TokenUserDto) {
    const { id } = tokenUser;
    const user = await this.userService.getUserProfile(id);
    return UserResponse.from(user);
  }
}
