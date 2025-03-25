import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
