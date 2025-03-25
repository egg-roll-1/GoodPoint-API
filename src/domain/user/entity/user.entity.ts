import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, Interest } from './user.enum';
import { VolunteerRequest } from 'src/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerHistory } from 'src/domain/volunteer-history/entity/volunteer-history.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'gender' })
  gender: Gender;

  @Column({ name: 'interest' })
  interest: Interest;

  /** 봉사활동 신청 내역 */
  @OneToMany(() => VolunteerRequest, (request) => request.user)
  volunteerRequestList: VolunteerRequest[];

  @OneToMany(() => VolunteerHistory, (history) => history.user)
  volunteerHistoryList: VolunteerHistory[];
}
