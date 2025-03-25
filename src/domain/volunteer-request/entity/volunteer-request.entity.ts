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
import { VolunteerWorkStatus } from './volunteer-request.enum';

@Entity({ name: 'volunteer_request' })
export class VolunteerRequest extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_volunteer_work' })
  userVolunteerWork: number;

  @Column({ name: 'status' })
  status: VolunteerWorkStatus;

  /** 연관관계 */
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
