import { Gender } from '@core/domain/user/entity/user.enum';
import { UserRepository } from '@core/domain/user/repository/user.repository';
import {
  generateNChars,
  generateNDigitRandomInt,
} from '@core/global/utils/string';
import { faker } from '@faker-js/faker/locale/ko';
import { Injectable } from '@nestjs/common';
import { SignUpRequest } from 'apps/user-api/src/auth/dto/request/signup.request';
import { AuthService } from 'apps/user-api/src/auth/service/auth.service';
import { VolunteerRequestService } from 'apps/user-api/src/volunteer-request/service/volunteer-request.service';
import { VolunteerWorkService } from 'apps/user-api/src/volunteer-work/service/volunteer-work.service';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserMockService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly volunteerWorkService: VolunteerWorkService,
    private readonly volunteerRequestService: VolunteerRequestService,
  ) {}

  public async signup() {
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

    const user = await this.userRepository.findOne({
      where: { phoneNumber: phone },
    });

    return user;
  }

  public async requestVolunteer(userId: number, workId: number) {
    return await this.volunteerWorkService.applyVolunteer(userId, workId);
  }
}
