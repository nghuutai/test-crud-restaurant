import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RestaurantEntity} from '../../entity/restaurant.entity'
import {RestaurantServiceEntity} from '../../entity/restaurantService.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, RestaurantServiceEntity])],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule {}
