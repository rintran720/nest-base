import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Query() query: any) {
    this.logger.debug('Get Index', query);
    return this.userService.create({ email: 'abc' });
  }
}
