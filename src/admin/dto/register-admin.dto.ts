import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the admin' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({ example: 'admin@example.com', description: 'Email address of the admin' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password with minimum 6 characters',
    minLength: 6,
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
