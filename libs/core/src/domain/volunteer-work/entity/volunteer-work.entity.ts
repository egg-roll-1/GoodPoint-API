import { EGBaseEntity } from '@core/global/entity/base.entity';
import { DayOfWeek } from '@core/domain/enum/day.enum';
import { Interest } from '@core/domain/enum/interest.enum';
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
import { RecruitTargetType, VolunteerWorkStatus } from './volunteer-work.enum';

@Entity({ name: 'volunteer_work' })
export class VolunteerWork extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_work_id' })
  id: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'recruit_start_date' })
  recruitStartDate: Date;

  @Column({ name: 'recruit_end_date' })
  recruitEndDate: Date;

  @Column({ name: 'day_of_week_list', nullable: true })
  _dayOfWeek: string;

  @Column({ name: 'people_count' })
  peopleCount: number;

  @Column({ name: 'recruit_people_count' })
  recruitPeopleCount: number;

  @Column({ name: 'interest' })
  interest: Interest;

  @Column({ name: 'target_type' })
  targetType: RecruitTargetType;

  @Column({ name: 'work_address' })
  workAddress: string;

  @Column({ name: 'work_place' })
  workPlace: string;

  @Column({ name: 'status', default: VolunteerWorkStatus.Recruiting })
  status: VolunteerWorkStatus;

  @Column({ name: 'latitude' })
  latitude: string;

  @Column({ name: 'longitude' })
  longitude: string;

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
  agency: Agency;

  @Column({ name: 'agency_id', nullable: true })
  agencyId: number;

  @OneToMany(() => VolunteerRequest, (request) => request.volunteerWork)
  volunteerRequestList: VolunteerRequest[];

  @OneToMany(() => VolunteerHistory, (history) => history.volunteerWork)
  volunteerHistoryList: VolunteerHistory[];
}
