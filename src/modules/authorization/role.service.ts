import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { IAction, actionMaps } from './action.const';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createRole({ name, actions }: CreateRoleDto) {
    try {
      for (let i = 0; i < actions.length; i++) {
        if (actionMaps.get(actions[i])) {
          throw new Error(`Invalid action: ${actions[i]}`);
        }
      }

      const role = await this.roleRepository.create({ name });
      await this.permissionRepository
        .createQueryBuilder()
        .insert()
        .into(Permission)
        .values(
          actions.map((code) => ({
            role,
            code,
            name: actionMaps.get(code)?.name,
          })),
        );
    } catch (error) {
      this.logger.error('CreateRole', error);
      throw error;
    }
  }
}
