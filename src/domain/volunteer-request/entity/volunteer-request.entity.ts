import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerWorkStatus } from './volunteer-request.enum';

@Entity({ name: 'volunteer_request' })
export class VolunteerRequest {
  @PrimaryGeneratedColumn({ name: 'user_volunteer_work' })
  userVolunteerWork: number;

  @Column({ name: 'volunteer_work_id' })
  volunteerWorkId: number;

  @Column({ name: 'status' })
  status: VolunteerWorkStatus;

  /** 연관관계 */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: number;
}
