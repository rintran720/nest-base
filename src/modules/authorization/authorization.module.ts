import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

const providers = [RoleService];

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [...providers],
  exports: [...providers],
})
export class AuthorizationModule {}
