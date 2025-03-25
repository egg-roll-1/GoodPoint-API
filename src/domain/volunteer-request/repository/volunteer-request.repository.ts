import { CustomRepository } from 'src/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { VolunteerRequest } from '../entity/volunteer-request.entity';

@CustomRepository(VolunteerRequest)
export class VolunteerRequestRepository extends Repository<VolunteerRequest> {}
