import { AgencyRepository } from '@core/domain/agency/repository/agency.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgencyService {
  constructor(private agencyRepository: AgencyRepository) {}
  async test() {}
}
