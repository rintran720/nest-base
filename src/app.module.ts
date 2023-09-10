import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedModule } from 'modules/shared/shared.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
