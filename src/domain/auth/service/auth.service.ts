import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { User } from 'src/domain/user/entity/user.entity';
import { UserException } from 'src/domain/user/exception/user.exception';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { EGException } from 'src/global/exception/exception';
import { Transactional } from 'typeorm-transactional';
import { LoginRequest } from '../dto/request/login.request';
import { SignUpRequest } from '../dto/request/signup.request';
import { LoginResponse } from '../dto/response/login.response';
import { TokenUserDto } from '../dto/token-user.dto';
import { AuthException } from '../exception/auth.exception';
import { JwtUtils } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtUtils: JwtUtils,
  ) {}

  /** 회원가입 */
  @Transactional()
  async signup(request: SignUpRequest) {
    const toSaveUser = request.toEntity();
    const existUser = await this.findByPhoneNumber(toSaveUser.phoneNumber);
    if (existUser) {
      throw new EGException(UserException.ALREADY_EXIST);
    }

    const savedUser = await this.userRepository.save(toSaveUser);
    return await this.doLogin(savedUser);
  }

  /** 로그인 */
  @Transactional()
  async login(request: LoginRequest) {
    const { phoneNumber, password } = request;
    const user = await this.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new EGException(UserException.NOT_FOUND);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new EGException(AuthException.NOT_AUTHENTICATED);
    }

    return await this.doLogin(user);
  }

  /** 토큰을 발급하여 로그인처리합니다. */
  private async doLogin(user: User) {
    const accessToken = await this.jwtUtils.createAccessToken(
      TokenUserDto.createOne(user),
    );

    return LoginResponse.create({ accessToken });
  }

  private async findByPhoneNumber(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: {
        phoneNumber,
        isRemoved: false,
      },
    });
  }
}
