import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerHistoryStatus } from './volunteer-history.enum';

@Entity({ name: 'volunteer_history' })
export class VolunteerHistory {
  @PrimaryGeneratedColumn({ name: 'volunteer_history_id' })
  id: number;

  @Column({ name: 'status' })
  status: VolunteerHistoryStatus;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'volunteer_work_id', nullable: true })
  volunteerWorkId: number;

  /*연관관계*/
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
