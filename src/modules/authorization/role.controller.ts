import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateRoleDecorator } from './decorators/create-role.decorator';

@Controller('role')
export class RoleController {
  private logger = new Logger(RoleController.name);

  constructor(private readonly roleService: RoleService) {}

  @CreateRoleDecorator()
  @Post()
  createRole(@Request() req: any, @Body() body: CreateRoleDto) {
    this.logger.log(req.user, JSON.stringify(body));
  }
}
