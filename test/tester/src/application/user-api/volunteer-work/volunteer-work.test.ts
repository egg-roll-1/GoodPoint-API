import { delay } from '@core/global/utils/time.utils';
import { GeoService } from '@core/infrastructure/openapi/geo.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { VolunteerWorkService } from 'apps/user-api/src/volunteer-work/service/volunteer-work.service';
import { UserMockService } from '../mock.service';

@Injectable()
export class VolunteerWorkTest implements OnModuleInit {
  constructor(
    private readonly volunteerWorkService: VolunteerWorkService,
    private readonly mockService: UserMockService,
    private readonly geoService: GeoService,
  ) {}

  async onModuleInit() {
    await delay(1000);
    // await this.봉사활동조회테스트();
    // await this.봉사활동신청();
  }
}
