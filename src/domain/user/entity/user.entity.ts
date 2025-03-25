import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, Interest } from './user.enum';

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
}
