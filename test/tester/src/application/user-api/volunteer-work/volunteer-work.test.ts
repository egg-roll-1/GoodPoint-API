import { delay } from '@core/global/utils/time.utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { GetVolunteerRequest } from 'apps/user-api/src/volunteer-work/dto/request/query.request';
import { VolunteerWorkResponse } from 'apps/user-api/src/volunteer-work/dto/response/volunteer-work.response';
import { VolunteerWorkService } from 'apps/user-api/src/volunteer-work/service/volunteer-work.service';
import assert from 'assert';
import { Builder } from 'builder-pattern';
import { MyTest } from 'test/tester/src/common/decorator/test.decorator';
import { UserMockService } from '../mock.service';

@Injectable()
export class VolunteerWorkTest implements OnModuleInit {
  constructor(
    private readonly volunteerWorkService: VolunteerWorkService,
    private readonly mockService: UserMockService,
  ) {}

  async onModuleInit() {
    await delay(1000);
    // await this.봉사활동조회테스트();
    // await this.봉사활동신청();
  }

  @MyTest()
  private async 봉사활동조회테스트() {
    // when
    const volunteerWorkList = await this.volunteerWorkService.searchList(
      Builder(GetVolunteerRequest).build(),
    );

    const response = await VolunteerWorkResponse.fromArray(
      volunteerWorkList.content,
    );

    assert.equal(response.length > 1, true, 'data exist');

    const target = await this.volunteerWorkService.getDetail(response[0].id);
    await VolunteerWorkResponse.from(target);
  }

  @MyTest()
  private async 봉사활동신청() {
    // given
    const user = await this.mockService.signup();

    // when
    const workPage = await this.volunteerWorkService.searchList(
      Builder(GetVolunteerRequest).build(),
    );
    const work = workPage.content[0];

    await this.volunteerWorkService.applyVolunteer(user.id, work.id);

    // then
    const workDetail = await this.volunteerWorkService.getDetail(work.id);
    const workResponse = await VolunteerWorkResponse.from(workDetail);

    assert.equal(workResponse.peopleCount, 1, 'work');
  }
}
