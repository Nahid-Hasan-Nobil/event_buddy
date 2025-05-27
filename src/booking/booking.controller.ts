import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../auth/user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Booking')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @ApiOperation({ summary: 'Book seats for an event (User only)' })
  @ApiResponse({ status: 201, description: 'Booking successful' })
  @ApiResponse({ status: 400, description: 'Invalid data or user email missing' })
  async bookEvent(@User() user: any, @Body() createBookingDto: CreateBookingDto) {
    if (!user || !user.email) {
      throw new BadRequestException('User email not found in token');
    }

    createBookingDto.userEmail = user.email;
    return this.bookingService.bookEvent(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @ApiOperation({ summary: 'Get all bookings for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of bookings returned successfully' })
  @ApiResponse({ status: 400, description: 'User email not found in token' })
  async getUserBookings(@User() user: any) {
    if (!user || !user.email) {
      throw new BadRequestException('User email not found in token');
    }

    return this.bookingService.getUserBookings(user.email);
  }
}
