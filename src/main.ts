import { AppModule } from './app.module';
import { BaseNestApplication } from './application/app';

async function bootstrap() {
  const nestApp = new BaseNestApplication(AppModule);

  await nestApp.setup();

  const config = await nestApp.getConfig();

  await nestApp.useSwagger(config?.swaggerPath, config?.appVersion);

  await nestApp.listen(config?.port);
}
bootstrap();
