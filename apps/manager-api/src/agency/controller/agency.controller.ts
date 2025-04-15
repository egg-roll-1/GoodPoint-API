import { Body, Controller, Post } from '@nestjs/common';
import { PostAgencyRequest } from '../dto/request/post.request';
import { ApiTags } from '@nestjs/swagger';
import { SignedUser } from '@core/application/auth/decorator/user.decorator';
import { TokenUserDto } from '@core/application/auth/dto/token-user.dto';
import { AgencyService } from '../service/agency.service';

@ApiTags('봉사기관 API')
@Controller('/agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  public async registerAgency(
    @SignedUser() tokenUser: TokenUserDto,
    @Body() request: PostAgencyRequest,
  ) {}
}
