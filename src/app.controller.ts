import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './modules/shared/services/config.service';

@Controller('/api')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  healthCheck() {
    return {
      name: this.configService.appName,
      version: this.configService.appVersion,
      environment: this.configService.nodeEnv,
    };
  }
}
