import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedModule } from 'modules/shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@Module({
  imports: [SharedModule, DatabaseModule, UserModule, AuthorizationModule],
  controllers: [AppController],
})
export class AppModule {}
