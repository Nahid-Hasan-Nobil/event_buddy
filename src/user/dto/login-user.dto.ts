import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Registered email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'Password of the user account',
    example: 'securePass123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
