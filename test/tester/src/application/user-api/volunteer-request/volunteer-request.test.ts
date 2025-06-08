import { delay } from '@core/global/utils/time.utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { VolunteerRequestService } from 'apps/user-api/src/volunteer-request/service/volunteer-request.service';
import { VolunteerWorkService } from 'apps/user-api/src/volunteer-work/service/volunteer-work.service';
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
  private async 봉사활동신청() {}
}
