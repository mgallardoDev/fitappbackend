import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  FoodEntity,
  IngestionEntity,
  MealEntity,
  RoleEntity,
  UserEntity,
  UserGoalEntity,
} from './infrastructure/typeorm/entities';
import { BaseEntity } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.fit-app.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        entities: [
          BaseEntity,
          FoodEntity,
          IngestionEntity,
          MealEntity,
          RoleEntity,
          UserEntity,
          UserGoalEntity,
        ],
        autoLoadEntities: true,
        logging: ['error'],
        logger: 'advanced-console',
        extra: {
          decimalNumbers: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
