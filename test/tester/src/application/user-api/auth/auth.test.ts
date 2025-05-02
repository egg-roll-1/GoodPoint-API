import { Gender } from '@core/domain/user/entity/user.enum';
import { UserException } from '@core/domain/user/exception/user.exception';
import { UserRepository } from '@core/domain/user/repository/user.repository';
import {
  generateNChars,
  generateNDigitRandomInt,
} from '@core/global/utils/string';
import { delay } from '@core/global/utils/time.utils';
import { faker } from '@faker-js/faker/locale/ko';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoginRequest } from 'apps/user-api/src/auth/dto/request/login.request';
import { SignUpRequest } from 'apps/user-api/src/auth/dto/request/signup.request';
import { AuthService } from 'apps/user-api/src/auth/service/auth.service';
import assert from 'assert';
import { Builder } from 'builder-pattern';
import { MyTest } from 'test/tester/src/common/decorator/test.decorator';

@Injectable()
export class UserAuthTest implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async onModuleInit() {
    await delay(1000);
    // await this.회원가입테스트();
    // await this.회원가입중복전화번호테스트();
    // await this.로그인테스트();
  }

  @MyTest()
  private async 로그인테스트() {
    // given
    const phone = `010${generateNDigitRandomInt(8)}`;
    const password = generateNChars(10);

    await this.authService.signup(
      Builder(SignUpRequest)
        .phoneNumber(phone)
        .password(password)
        .name(faker.person.fullName())
        .age(32)
        .gender(Gender.F)
        .build(),
    );

    // when
    const loginResponse = await this.authService.login(
      Builder(LoginRequest).phoneNumber(phone).password(password).build(),
    );

    console.log(loginResponse);
  }

  @MyTest()
  private async 회원가입테스트() {
    // given
    // when
    const phone = `010${generateNDigitRandomInt(8)}`;
    await this.authService.signup(
      Builder(SignUpRequest)
        .phoneNumber(phone)
        .password(generateNChars(10))
        .name(faker.person.fullName())
        .age(32)
        .gender(Gender.F)
        .build(),
    );
    //

    //then
    const user = await this.userRepository.findOne({
      where: { phoneNumber: phone },
    });

    assert.equal(!!user, true, 'user is not undefined');
  }

  @MyTest({ expectError: UserException.ALREADY_EXIST })
  private async 회원가입중복전화번호테스트() {
    // given
    const phone = `010${generateNDigitRandomInt(8)}`;
    await this.authService.signup(
      Builder(SignUpRequest)
        .phoneNumber(phone)
        .password(generateNChars(10))
        .name(faker.person.fullName())
        .age(32)
        .gender(Gender.F)
        .build(),
    );

    // when
    await this.authService.signup(
      Builder(SignUpRequest)
        .phoneNumber(phone)
        .password(generateNChars(10))
        .name(faker.person.fullName())
        .age(32)
        .gender(Gender.F)
        .build(),
    );

    //then
  }
}
