import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account (min 6 characters)',
    example: 'securePass123',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
