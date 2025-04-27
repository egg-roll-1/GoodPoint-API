import { User } from '@core/domain/user/entity/user.entity';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerHistoryStatus } from './volunteer-history.enum';

@Entity({ name: 'volunteer_history' })
export class VolunteerHistory extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_history_id' })
  id: number;

  @Column({ name: 'status' })
  status: VolunteerHistoryStatus;

  @Column({ name: 'start_date_time' })
  startDateTime: Date;

  @Column({ name: 'end_date_time' })
  endDateTime: Date;

  @Column({ name: 'hour' })
  hour: number;

  /*연관관계*/
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => VolunteerWork)
  @JoinColumn({ name: 'volunteer_work_id' })
  volunteerWork: VolunteerWork;

  @Column({ name: 'volunteer_work_id', nullable: true })
  volunteerWorkId: number;
}
