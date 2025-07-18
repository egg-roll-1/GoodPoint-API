import { DayOfWeek, DayOfWeekList } from '@core/domain/enum/day.enum';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { KSTDate } from '@core/global/utils/date';
import { Builder } from 'builder-pattern';
import { Agency } from 'libs/core/src/domain/agency/entity/agency.entity';
import { VolunteerHistory } from 'libs/core/src/domain/volunteer-history/entity/volunteer-history.entity';
import { VolunteerRequest } from 'libs/core/src/domain/volunteer-request/entity/volunteer-request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerTag } from './volunteer-tag.entity';
import { VolunteerWorkStatus } from './volunteer-work.enum';

@Entity({ name: 'volunteer_work' })
export class VolunteerWork extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_work_id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'start_minute' })
  startMinute: number;

  @Column({ name: 'end_minute' })
  endMinute: number;

  @Column({ name: 'recruit_start_date' })
  recruitStartDate: Date;

  @Column({ name: 'recruit_end_date' })
  recruitEndDate: Date;

  @Column({ name: 'day_of_week_list', nullable: true })
  _dayOfWeek: string;

  @Column({ name: 'recruit_people_count', default: 1 })
  recruitPeopleCount: number;

  @Column({ name: 'notice', length: 1000 })
  notice: string;

  @Column({ name: 'work_address' })
  workAddress: string;

  @Column({ name: 'work_place' })
  workPlace: string;

  @Column({ name: 'status', default: VolunteerWorkStatus.Recruiting })
  status: VolunteerWorkStatus;

  @Column({ name: 'latitude', nullable: true, default: null })
  latitude: string;

  @Column({ name: 'longitude', nullable: true, default: null })
  longitude: string;

  @Column({ name: 'max_hour', nullable: true, default: 2 })
  maxHour: number;

  @OneToMany(() => VolunteerTag, (tag) => tag.volunteerWork)
  tagList: VolunteerTag[];

  /** Getter/Setter */
  set dayOfWeek(dayOfWeekList: DayOfWeek[]) {
    this._dayOfWeek = dayOfWeekList.join(',');
  }

  get dayOfWeek() {
    return this._dayOfWeek
      ? (this._dayOfWeek.split(',') as unknown as DayOfWeek[])
      : [];
  }

  /** 연관관계 */
  @ManyToOne(() => Agency)
  @JoinColumn({ name: 'agency_id' })
  agency: Promise<Agency>;

  @Column({ name: 'agency_id', nullable: true })
  agencyId: number;

  @OneToMany(() => VolunteerRequest, (request) => request.volunteerWork)
  volunteerRequestList: VolunteerRequest[];

  @OneToMany(() => VolunteerHistory, (history) => history.volunteerWork)
  volunteerHistoryList: VolunteerHistory[];

  /** 생성메서드 */
  static createOne(
    object: Pick<
      VolunteerWork,
      | 'startDate'
      | 'endDate'
      | 'startMinute'
      | 'endMinute'
      | 'recruitStartDate'
      | 'recruitEndDate'
      | 'dayOfWeek'
      | 'recruitPeopleCount'
      | 'notice'
      | 'workAddress'
      | 'workPlace'
      | 'agencyId'
      | 'title'
    > &
      Partial<VolunteerWork>,
  ) {
    return Builder(VolunteerWork)
      .id(object.id)
      .title(object.title)
      .startDate(object.startDate)
      .endDate(object.endDate)
      .startMinute(object.startMinute)
      .endMinute(object.endMinute)
      .recruitStartDate(object.recruitStartDate)
      .recruitEndDate(object.recruitEndDate)
      .dayOfWeek(object.dayOfWeek)
      .recruitPeopleCount(object.recruitPeopleCount)
      .notice(object.notice)
      .workAddress(object.workAddress)
      .workPlace(object.workPlace)
      .longitude(object.longitude)
      .latitude(object.latitude)
      .agencyId(object.agencyId)
      .build();
  }

  public getDateList() {
    const dayOfWeek = new Set(this.dayOfWeek);
    const startDate = KSTDate(this.startDate).startOf('day');
    const endDate = KSTDate(this.endDate).startOf('day').add(1, 'day');

    const result: Date[] = [];
    for (let cur = startDate; cur.isBefore(endDate); cur = cur.add(1, 'day')) {
      const day = DayOfWeekList[cur.day()];
      if (dayOfWeek.has(day)) {
        result.push(cur.toDate());
      }
    }

    return result;
  }
}
