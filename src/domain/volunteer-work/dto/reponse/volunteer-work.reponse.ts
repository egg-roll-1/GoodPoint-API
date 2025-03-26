import { Builder } from 'builder-pattern';
import { DayOfWeek } from 'src/global/enum/day.enum';
import { VolunteerWork } from '../../entity/volunteer-work.entity';

export class VolunteerWorkResponse {
  id: number;

  startDate: Date;

  endDate: Date;

  recruitStartDate: Date;

  recruitEndDate: Date;

  dayOfWeek: DayOfWeek;

  peopleCount: number;

  recruitPeopleCount: number;

  type: string;

  userType: string;

  workAddress: string;

  workPlace: string;
  //   volunteerWork: VolunteerWork[];

  static from(entity: VolunteerWork) {
    const dto = Builder(VolunteerWorkResponse)
      .id(entity.id)
      .startDate(entity.startDate)
      .endDate(entity.endDate)
      .recruitStartDate(entity.recruitStartDate)
      .dayOfWeek(entity.dayOfWeek)
      .peopleCount(entity.peopleCount)
      .recruitPeopleCount(entity.recruitPeopleCount)
      .type(entity.type)
      .userType(entity.userType)
      .workAddress(entity.workAddress)
      .workPlace(entity.workPlace)
      .build();

    return dto;
  }
}
