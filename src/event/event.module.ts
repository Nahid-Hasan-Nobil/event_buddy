import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Import AuthModule to access JwtService

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule, // ✅ Needed to inject JwtService used in RolesGuard
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
