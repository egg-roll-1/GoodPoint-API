import { Controller, Get } from '@nestjs/common';
import { EGException } from 'src/global/exception/exception';
import { UserException } from '../exception/user.exception';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  helloUser() {
    return this.userService.getHello();
  }

  @Get('/not-found')
  notFoundTest() {
    throw new EGException(UserException.NOT_FOUND);
  }
}
