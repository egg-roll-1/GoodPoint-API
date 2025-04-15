import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { Manager } from '../entity/manager.entity';

@CustomRepository(Manager)
export class ManagerRepository extends Repository<Manager> {}
