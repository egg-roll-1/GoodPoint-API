import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
