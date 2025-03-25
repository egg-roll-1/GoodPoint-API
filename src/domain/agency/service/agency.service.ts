import { Injectable } from '@nestjs/common';
import { AgencyRepository } from '../repository/agency.repository';

@Injectable()
export class AgencyService {
  constructor(private agencyRepository: AgencyRepository) {}
  async test() {}
}
