import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import { setupSwagger } from './setup-swagger';
import { HttpExceptionFilter } from './exception.filter';
import { SharedModule } from '../modules/shared/shared.module';
import { ConfigService } from '../modules/shared/services/config.service';

export class BaseNestApplication {
  public app: NestExpressApplication;

  public logger = new Logger(BaseNestApplication.name);

  constructor(private appModule: unknown) {}

  async setup(
    option: NestApplicationOptions = { cors: true },
  ): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(
      this.appModule,
      new ExpressAdapter(),
      option,
    );

    if (option.cors) {
      app.enableCors();
    }
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    app.use(helmet());
    app.use(compression());
    app.use(morgan('combined'));

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        // dismissDefaultMessages: true,
        forbidUnknownValues: true,
        // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      }),
    );

    this.app = app;

    return app;
  }

  async useSwagger(swaggerPath: string, apiVersion: string): Promise<void> {
    setupSwagger(this.app, swaggerPath, apiVersion);
  }

  async listen(port: number): Promise<void> {
    await this.app?.listen(port);

    this.logger.log(`SERVER RUNNING ON PORT ${port}`);
  }

  async getConfig() {
    return await this.app?.select(SharedModule).get(ConfigService);
  }
}
