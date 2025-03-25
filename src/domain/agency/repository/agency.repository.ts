import { CustomRepository } from 'src/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { Agency } from '../entity/agency.entity';

@CustomRepository(Agency)
export class AgencyRepository extends Repository<Agency> {}
