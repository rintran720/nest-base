import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from '../modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../modules/shared/services/config.service';
import { User } from '../modules/user/user.entity';
import { Role } from '../modules/authorization/role.entity';
import { Permission } from '../modules/authorization/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [forwardRef(() => SharedModule)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          ...config.mysql, // host, port, username, password, database
          autoLoadModels: true, // With that "autoLoadModels" and "synchronize" specified, every model registered through the forFeature()
          synchronize: true, // method will be automatically added to the models array of the configuration object. - CREATE TABLE IF NOT EXISTS
          // query: {
          //   raw: true,
          // }
          entities: [User, Role, Permission],
        };
      },
    }),
  ],
})
export class MysqlModule {}
