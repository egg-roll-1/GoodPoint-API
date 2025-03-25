import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VolunteerWorkStatus } from './volunteer-request.enum';

@Entity({ name: 'volunteer_request' })
export class VolunteerRequest {
  @PrimaryGeneratedColumn({ name: 'user_volunteer_work' })
  userVolunteerWork: number;

  @Column({ name: 'volunteer_work_id' })
  volunteerWorkId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'status' })
  status: VolunteerWorkStatus;
}
