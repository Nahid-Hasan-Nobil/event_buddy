import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Admin email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ example: 'yourPassword123', description: 'Admin password' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
