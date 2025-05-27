import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // -------------------- Admin (Protected) Routes --------------------

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event (Admin only)' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createDto: CreateEventDto) {
    try {
      return await this.eventService.createEvent(createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(@Param('id') id: number, @Body() updateDto: UpdateEventDto) {
    try {
      return await this.eventService.updateEvent(id, updateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async delete(@Param('id') id: number) {
    try {
      return await this.eventService.deleteEvent(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all events (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all events' })
  async findAll() {
    return await this.eventService.getAllEvents();
  }

  // -------------------- Public Routes --------------------

  @Public()
  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming events (Public)' })
  @ApiResponse({ status: 200, description: 'List of upcoming events' })
  async getUpcomingEvents() {
    return await this.eventService.getUpcomingEvents();
  }

  @Public()
  @Get('past')
  @ApiOperation({ summary: 'Get past events (Public)' })
  @ApiResponse({ status: 200, description: 'List of past events' })
  async getPreviousEvents() {
    return await this.eventService.getPreviousEvents();
  }

  @Public()
  @Get(':eventName')
  @ApiOperation({ summary: 'Get details of a specific event by name (Public)' })
  @ApiResponse({ status: 200, description: 'Event details returned' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventDetails(@Param('eventName') eventName: string) {
    try {
      return await this.eventService.getEventDetailsByName(eventName);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
