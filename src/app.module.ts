import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { SessionModule } from './session/session.module';
import { CommonModule } from './common/common.module';
import { UserSchoolModule } from './user-school/user-school.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        //TODO: Remove this logger in production
        const logger = new Logger('DatabaseConfig');
        
        logger.debug(`DATABASE_HOST: ${configService.get('DATABASE_HOST')}`);
        logger.debug(`DATABASE_PORT: ${configService.get('DATABASE_PORT')}`);
        logger.debug(`DATABASE_USERNAME: ${configService.get('DATABASE_USERNAME')}`);
        logger.debug(`DATABASE_NAME: ${configService.get('DATABASE_NAME')}`);
        logger.debug(`DATABASE_PASS: ${configService.get('DATABASE_PASSWORD')}`);

        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // TODO: set false to production
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    SchoolModule,
    SessionModule,
    UserSchoolModule,
    AuthModule
  ]
})
export class AppModule {}