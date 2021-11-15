import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import {Type} from 'class-transformer';

@Entity('restaurant_services_service')
export class RestaurantServiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public restaurantId: string;

    @PrimaryGeneratedColumn('uuid')
    public serviceId: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    create_date: Date;
  
    @Column()
    @IsDate()
    @Type(() => Date)
    @UpdateDateColumn()
    modify_date: Date;
}