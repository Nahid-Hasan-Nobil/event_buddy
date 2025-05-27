import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Public } from '../auth/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('User') // Swagger group/tag
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Public route: Register a new user
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() registerDto: RegisterUserDto) {
    try {
      const result = await this.userService.register(registerDto);
      return {
        statusCode: 201,
        message: result.message,
        user: result.user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ✅ Public route: Login and receive JWT token
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const result = await this.userService.login(loginDto);
      return {
        statusCode: 200,
        message: result.message,
        accessToken: result.accessToken,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // ✅ Protected route: Delete a user (requires "user" role)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID (requires user role)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: string) {
    try {
      const result = await this.userService.deleteUser(Number(id));
      return {
        statusCode: 200,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
