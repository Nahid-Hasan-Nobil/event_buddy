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
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({ status: 201, description: 'Admin registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() registerDto: RegisterAdminDto) {
    try {
      const result = await this.adminService.register(registerDto);
      return {
        statusCode: 201,
        message: result.message,
        admin: result.admin,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Admin login and get JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginAdminDto) {
    try {
      const result = await this.adminService.login(loginDto);
      return {
        statusCode: 200,
        message: result.message,
        accessToken: result.accessToken,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async delete(@Param('id') id: number) {
    try {
      const result = await this.adminService.deleteAdmin(id);
      return {
        statusCode: 200,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
