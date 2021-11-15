import {IsString, IsArray, IsOptional, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateRestaurantDto {
    @ApiProperty()
    @IsString()
    public name: string;

    @ApiProperty()
    @IsString()
    public address: string;

    @ApiProperty()
    @IsArray()
    public serviceIds: string[];
}

export class UpdateRestaurantDto {
    @ApiProperty({ required: false, nullable: true })
    @IsString()
    @IsOptional()
    public name: string;

    @ApiProperty({ required: false, nullable: true })
    @IsString()
    @IsOptional()
    public address: string;

    @ApiProperty({ required: false, nullable: true })
    @IsArray()
    @IsOptional()
    public serviceIds: string[];
}

export class QueryRestaurantDto {
    @ApiProperty({ required: false, nullable: true })
    @IsString()
    @IsOptional()
    public serviceId?: string;

    @ApiProperty({ required: false, nullable: true })
    @IsNumber()
    @IsOptional()
    public offset?: number;

    @ApiProperty({ required: false, nullable: true })
    @IsNumber()
    @IsOptional()
    public limit?: number;
}