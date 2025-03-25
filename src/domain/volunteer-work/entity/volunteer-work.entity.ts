import { Agency } from 'src/domain/agency/entity/agency.entity';
import { VolunteerRequest } from 'src/domain/volunteer-request/entity/volunteer-request.entity';
import { DayOfWeek } from 'src/global/enum/day.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'volunteer_work' })
export class VolunteerWork {
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

  @Column({ name: 'day_of_week' })
  dayOfWeek: DayOfWeek;

  @Column({ name: 'people_count' })
  peopleCount: number;

  @Column({ name: 'recruit_people_count' })
  recruitPeopleCount: number;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'user_type' })
  userType: string;

  @Column({ name: 'work_address' })
  workAddress: string;

  @Column({ name: 'work_place' })
  workPlace: string;

  /** 연관관계 */
  @ManyToOne(() => Agency)
  @JoinColumn({ name: 'agency_id' })
  agency: Agency;

  @OneToMany(() => VolunteerRequest, (request) => request.volunteerWork)
  volunteerRequestList: VolunteerRequest[];
}
