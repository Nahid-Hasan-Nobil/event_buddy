import { IsInt, IsNotEmpty, Min, Max, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user booking the event',
  })
  @IsEmail({}, { message: 'Valid user email is required' })
  userEmail: string;

  @ApiProperty({
    example: 'Tech Conference 2025',
    description: 'Name of the event to book',
  })
  @IsNotEmpty({ message: 'Event name is required' })
  eventName: string;

  @ApiProperty({
    example: 2,
    description: 'Number of seats to book (1 to 4)',
    minimum: 1,
    maximum: 4,
  })
  @IsInt({ message: 'Seats must be an integer value' })
  @Min(1, { message: 'Minimum 1 seat must be booked' })
  @Max(4, { message: 'You can book a maximum of 4 seats' })
  seatsBooked: number;
}
