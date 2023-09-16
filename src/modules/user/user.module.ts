import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

const services = [UserService];

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [...services],
  exports: [...services],
})
export class UserModule {}
