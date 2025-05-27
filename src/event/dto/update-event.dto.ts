import { IsString, IsOptional, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiPropertyOptional({ description: 'Name of the event', example: 'Tech Conference 2025' })
  @IsString()
  @IsOptional()
  eventName?: string;

  @ApiPropertyOptional({ description: 'Location of the event', example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'Date of the event in ISO format', example: '2025-07-14' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ description: 'Time of the event', example: '15:00' })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ description: 'Detailed description of the event', example: 'An annual conference focused on emerging technologies.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Total capacity of the event', example: 200 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  totalCapacity?: number;
}
