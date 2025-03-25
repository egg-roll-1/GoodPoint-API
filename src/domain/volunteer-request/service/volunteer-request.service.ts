import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/volunteer-request.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async test() {}
}
