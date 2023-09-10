import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  swaggerPath: string,
  apiVersion: string,
  tag?: string,
): void {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion(apiVersion)
    .addTag(tag)
    .addSecurity('main', {
      type: 'http',
      scheme: 'bearer',
      description: 'main service',
    })
    .addSecurity('second', {
      type: 'http',
      scheme: 'bearer',
      description: 'second.com',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // Have 2 document links:
  // /swaggerPath : path to the swagger UI
  // /swaggerPath-json : path to the swagger json file
  SwaggerModule.setup(swaggerPath, app, document);
}
