import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '@core/global/config/const.config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        entities: ['dist/**/*.entity.js'],
        timezone: 'Z',
      }),
      dataSourceFactory: async (options) => {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
