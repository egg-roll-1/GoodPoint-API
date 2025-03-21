import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getHello() {
    const user: User = {
      id: undefined,
      name: '홍길동',
      email: new Date().toJSON(),
      password: new Date().toJSON(),
    };

    await this.userRepository.save(user);
    return 'hello user service';
  }
}
