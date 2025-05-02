import { delay } from '@core/global/utils/time.utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { VolunteerRequestService } from 'apps/user-api/src/volunteer-request/service/volunteer-request.service';
import { GetVolunteerRequest } from 'apps/user-api/src/volunteer-work/dto/request/query.request';
import { VolunteerWorkService } from 'apps/user-api/src/volunteer-work/service/volunteer-work.service';
import { Builder } from 'builder-pattern';
import { MyTest } from 'test/tester/src/common/decorator/test.decorator';
import { UserMockService } from '../mock.service';

@Injectable()
export class VolunteerWorkRequestTest implements OnModuleInit {
  constructor(
    private readonly volunteerRequestService: VolunteerRequestService,
    private readonly volunteerWorkService: VolunteerWorkService,
    private readonly mockService: UserMockService,
  ) {}

  async onModuleInit() {
    await delay(1000);
    // await this.봉사활동신청();
    // await this.봉사활동신청취소();
  }

  @MyTest()
  private async 봉사활동신청() {
    // given
    const user = await this.mockService.signup();
    const workPage = await this.volunteerWorkService.searchList(
      Builder(GetVolunteerRequest).build(),
    );

    // when
    await this.mockService.requestVolunteer(user.id, workPage.content[0].id);

    // then
    const requestList =
      await this.volunteerRequestService.getVolunteerRequestList(user.id);

    console.log(requestList.length);
  }

  @MyTest()
  private async 봉사활동신청취소() {
    // given
    const user = await this.mockService.signup();
    const workPage = await this.volunteerWorkService.searchList(
      Builder(GetVolunteerRequest).build(),
    );

    // when
    const request = await this.mockService.requestVolunteer(
      user.id,
      workPage.content[0].id,
    );

    // then
    {
      await this.volunteerRequestService.cancel(user.id, request.id);
      const requestList =
        await this.volunteerRequestService.getVolunteerRequestList(user.id);
      console.log('request list: ', requestList);
    }
  }
}
