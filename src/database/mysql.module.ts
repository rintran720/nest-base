import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from '../modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../modules/shared/services/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // name: 'DEFAULT',
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
        };
      },
    }),
  ],
})
export class MysqlModule {}
