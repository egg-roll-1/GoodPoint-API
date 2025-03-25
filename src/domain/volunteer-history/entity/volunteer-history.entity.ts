import { User } from 'src/domain/user/entity/user.entity';
import { VolunteerWork } from 'src/domain/volunteer-work/entity/volunteer-work.entity';
import { EGBaseEntity } from 'src/global/entity/base.entity';
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
