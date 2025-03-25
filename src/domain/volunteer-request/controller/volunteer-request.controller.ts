import { Controller, Get } from '@nestjs/common';
import { EGException } from 'src/global/exception/exception';
import { UserException } from '../exception/volunteer-request.exception';
import { UserService } from '../service/volunteer-request.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/not-found')
  notFoundTest() {
    throw new EGException(UserException.NOT_FOUND);
  }
}
