import { Builder } from 'builder-pattern';
import { VolunteerHistory } from 'src/domain/volunteer-history/entity/volunteer-history.entity';
import { VolunteerRequest } from 'src/domain/volunteer-request/entity/volunteer-request.entity';
import { EGBaseEntity } from 'src/global/entity/base.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from './user.enum';
import { Interest } from '../../../global/enum/interest.enum';

@Entity({ name: 'user' })
export class User extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Index()
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'gender' })
  gender: Gender;

  @Column({ name: 'interest', nullable: true })
  _interest: string;

  /** Setter/Getter */
  set interest(interestList: Interest[]) {
    this._interest = interestList.join(',');
  }

  get interest() {
    if (!this._interest) {
      return [];
    }

    return this._interest.split(',').map((x) => x as Interest);
  }

  /** 봉사활동 신청 내역 */
  @OneToMany(() => VolunteerRequest, (request) => request.user)
  volunteerRequestList: VolunteerRequest[];

  @OneToMany(() => VolunteerHistory, (history) => history.user)
  volunteerHistoryList: VolunteerHistory[];

  /** 생성 메서드 */
  private static builder() {
    return Builder(User);
  }

  static create(
    object: Pick<
      User,
      'name' | 'phoneNumber' | 'password' | 'age' | 'gender' | 'interest'
    > &
      Partial<User>,
  ) {
    return User.builder()
      .id(object.id)
      .name(object.name)
      .phoneNumber(object.phoneNumber)
      .password(object.password)
      .age(object.age)
      .gender(object.gender)
      .interest(object.interest)
      .build();
  }
}
