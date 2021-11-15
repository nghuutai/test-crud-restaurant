import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto, QueryRestaurantDto, UpdateRestaurantDto } from '../../dto/restaurant.dto';
import {RestaurantEntity} from '../../entity/restaurant.entity';
import {RestaurantServiceEntity} from '../../entity/restaurantService.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository(RestaurantEntity) private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantServiceEntity) private restaurantServiceRepo: Repository<RestaurantEntity>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurantResult = await this.restaurantRepo.save(createRestaurantDto);
    const restaurantServiceData = createRestaurantDto.serviceIds.map(item => ({
      serviceId: item,
      restaurantId: restaurantResult.id,
    }))
    await this.restaurantServiceRepo.save(restaurantServiceData as RestaurantServiceEntity[]);
    return restaurantResult;
  }

  async findAll(query: QueryRestaurantDto) {
    const queryBuilder = this.restaurantRepo.createQueryBuilder('restaurant')
      .innerJoinAndSelect("restaurant.services", 'service')
    if (query.serviceId) {
      queryBuilder.where("service.id = :id", {id: query.serviceId})
    }
    queryBuilder.limit(query.limit).offset(query.offset)
    const result = await queryBuilder.getRawAndEntities();
    return result.entities;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const serviceIds = updateRestaurantDto.serviceIds;
    delete updateRestaurantDto.serviceIds;
    const result = await this.restaurantRepo.update({id}, updateRestaurantDto);
    if (serviceIds) {
      await this.restaurantServiceRepo.createQueryBuilder().delete().where("restaurantId=:id", {id}).execute();;
      const restaurantServiceData = serviceIds.map(item => ({
        serviceId: item,
        restaurantId: id,
      }))
      await this.restaurantServiceRepo.save(restaurantServiceData as RestaurantServiceEntity[]);
    }
    
    return result.raw;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
