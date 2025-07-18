import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { AuthException } from '@core/application/auth/exception/auth.exception';
import { JwtUtils } from '@core/application/auth/service/jwt.utils';
import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ManagerRepository } from '@core/domain/manager/repository/manager.repository';
import { UserException } from '@core/domain/user/exception/user.exception';
import { SALT_ROUND } from '@core/global/config/const.config';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';
import { LoginRequest } from '../dto/request/login.request';
import { SignUpRequest } from '../dto/request/signup.request';
import { LoginResponse } from '../dto/response/login.response';

@Injectable()
export class AuthService {
  private readonly SALT_ROUND: number;

  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly jwtUtils: JwtUtils,
    private readonly configService: ConfigService,
  ) {
    this.SALT_ROUND = Number(this.configService.get(SALT_ROUND));
  }

  /** 회원가입 */
  @Transactional()
  async signup(request: SignUpRequest) {
    const encryptedPassword = await bcrypt.hash(
      request.password,
      this.SALT_ROUND,
    );

    const toSaveUser = request.toEntity(encryptedPassword);
    const existUser = await this.findByPhoneNumber(toSaveUser.phoneNumber);
    if (existUser) {
      throw new EGException(UserException.ALREADY_EXIST);
    }

    const savedUser = await this.managerRepository.save(toSaveUser);
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
  private async doLogin(manager: Manager) {
    const { token: accessToken, expiredAt } =
      await this.jwtUtils.createAccessToken(TokenUserDto.createOne(manager));

    return LoginResponse.create({ accessToken, expiredAt });
  }

  private async findByPhoneNumber(phoneNumber: string) {
    return await this.managerRepository.findOne({
      where: {
        phoneNumber,
        isRemoved: false,
      },
    });
  }
}
