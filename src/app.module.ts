import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm/dist/typeorm.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'database',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsTableName: "custom_migration_table",
        migrations: ['dist/migration/*.js'],
        cli: {
          'migrationsDir': 'src/migration'
        },
        autoLoadEntities: true,
        logging: true,
      })
    }),
    RestaurantModule,
  ],
  controllers: [],
})
export class AppModule {}
