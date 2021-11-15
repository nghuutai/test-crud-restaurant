import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsDate, IsString } from 'class-validator';
import {Type} from 'class-transformer';
import { ServiceEntity } from './service.entity';

@Entity('restaurant')
export class RestaurantEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @IsString()
    public name: string;

    @Column()
    @IsString()
    public address: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    create_date: Date;
  
    @Column()
    @IsDate()
    @Type(() => Date)
    @UpdateDateColumn()
    modify_date: Date;

    @ManyToMany(() => ServiceEntity)
    @JoinTable()
    services: ServiceEntity[];
}