import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { MySqlDatabaseConfig } from '../interfaces/mysql-database.config';
import { MongoDBDatabaseConfig } from '../interfaces/mongodb-database.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppPkg = require('../../../../package.json');

@Injectable()
export class ConfigService {
  private logger = new Logger(ConfigService.name);

  constructor() {
    const { nodeEnv = 'development' } = this;
    dotenv.config({
      path: `environments/.${nodeEnv}.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
    console.log('initialized environment');
  }

  toJSON() {
    const proto = Object.getPrototypeOf(this);
    const jsonObj: any = Object.assign({}, this);

    Object.entries(Object.getOwnPropertyDescriptors(proto))
      .filter(([_key, descriptor]) => typeof descriptor.get === 'function')
      .map(([key, descriptor]) => {
        if (descriptor && key[0] !== '_') {
          try {
            const val = (this as any)[key];
            jsonObj[key] = val;
          } catch (error) {
            console.error(`Error calling getter ${key}`, error);
          }
        }
      });

    return jsonObj;
  }

  get appName(): string {
    return AppPkg.description;
  }

  get appVersion(): string {
    return AppPkg.version;
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getBoolean(key: string): boolean {
    return ['1', 'true'].includes(process.env[key]);
  }

  public getNumber(key: string, defaultValue?: number): number {
    const v = Number(this.get(key));
    return Number.isNaN(v) ? defaultValue : v;
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get host(): string {
    return this.get('HOST') || 'localhost';
  }

  get port(): number {
    return this.getNumber('PORT', 3000);
  }

  get swaggerPath(): string {
    return this.get('SWAGGER_PATH') || 'api-docs';
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET') || 'jwt_secret';
  }

  get jwtExpiresIn(): string {
    return this.get('JWT_EXPIRES_IN') || '1d';
  }

  get mysql(): MySqlDatabaseConfig {
    return {
      host: this.get('MYSQL_HOST') || 'localhost',
      port: this.getNumber('MYSQL_PORT') || 3306,
      username: this.get('MYSQL_USERNAME') || 'root',
      password: this.get('MYSQL_PASSWORD') || 'root',
      database: this.get('MYSQL_DATABASE') || 'nest-base',
    };
  }

  get mongodb(): MongoDBDatabaseConfig {
    return {
      host: this.get('MONGODB_HOST') || 'localhost',
      port: this.getNumber('MONGODB_PORT') || 27017,
      username: this.get('MONGODB_USERNAME') || undefined,
      password: this.get('MONGODB_PASSWORD') || undefined,
      database: this.get('MONGODB_DATABASE') || 'nest-mongo',
    };
  }

  get redisUrl(): string {
    return this.get('REDIS_URL');
  }
}
