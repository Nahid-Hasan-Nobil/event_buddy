import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

import { User } from './user/user.entity';
import { Admin } from './admin/admin.entity';
import { Event } from './event/event.entity';
import { Booking } from './booking/booking.entity';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'event_buddy',
      entities: [User, Admin, Event, Booking], // <-- Added Booking entity here
      synchronize: true,
      logging: true,
    }),
    UserModule,
    EventModule,
    AdminModule,
    MailModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Global JWT authentication guard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,   // Global Roles guard
    },
  ],
})
export class AppModule {}
