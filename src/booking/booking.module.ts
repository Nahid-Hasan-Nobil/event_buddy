import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

import { Booking } from './booking.entity';
import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';

import { AuthModule } from '../auth/auth.module';  // Import AuthModule for JWT services

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, User, Event]),
    AuthModule,  // Add AuthModule here
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
