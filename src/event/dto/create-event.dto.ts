import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'Name of the event', example: 'Tech Conference 2025' })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ description: 'Location of the event', example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Date of the event in ISO format', example: '2025-07-14' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Time of the event', example: '15:00' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiPropertyOptional({ description: 'Detailed description of the event', example: 'An annual conference focused on emerging technologies.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Total capacity of the event', example: 200 })
  @IsNumber()
  @Min(1)
  totalCapacity: number;
}
