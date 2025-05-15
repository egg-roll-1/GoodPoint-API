import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetVolunteerRequestQuery } from '../dto/request/query.request';
import { VolunteerRequestResponse } from '../dto/response/volunteer-request.response';
import { VolunteerRequestService } from '../service/volunteer-request.service';

@ApiBearerAuth()
@ApiTags('VolunteerRequest API')
@Controller('/volunteer-request')
export class VolunteerRequestController {
  constructor(
    private readonly volunteerRequestService: VolunteerRequestService,
  ) {}

  @Get('')
  public async getVolunteerRequest(
    @SignedUser() tokenUser: TokenUserDto,
    @Query() request: GetVolunteerRequestQuery,
  ) {
    const { id: userId } = tokenUser;
    const result = await this.volunteerRequestService.getVolunteerRequest(
      userId,
      request,
    );
    return await VolunteerRequestResponse.fromArray(result);
  }
}
