import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { LoginRequest } from '../dto/request/login.request';
import { SignUpRequest } from '../dto/request/signup.request';
import { AuthService } from '../service/auth.service';
import { LoginResponse } from '../dto/response/login.response';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ type: () => LoginResponse })
  async login(@Body() request: LoginRequest) {
    return await this.authService.login(request);
  }

  @Public()
  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ type: () => LoginResponse })
  async signup(@Body() request: SignUpRequest) {
    return await this.authService.signup(request);
  }
}
