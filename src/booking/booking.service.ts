import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Booking } from './booking.entity';
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // User books seats for an event
  async bookEvent(createBookingDto: CreateBookingDto): Promise<{ message: string; booking: Booking }> {
    const { userEmail, eventName, seatsBooked } = createBookingDto;

    // Validate seats count
    if (seatsBooked < 1 || seatsBooked > 4) {
      throw new BadRequestException('You can book between 1 to 4 seats only');
    }

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    // Find event by eventName
    const event = await this.eventRepository.findOne({ where: { eventName } });
    if (!event) {
      throw new NotFoundException(`Event with name "${eventName}" not found`);
    }

    // Check if event date is today or in the future (booking allowed only for future or same day)
    const today = new Date().toISOString().slice(0, 10);
    if (event.date < today) {
      throw new BadRequestException('Cannot book seats for past events');
    }

    // Check if booking would exceed event capacity
    const currentBooked = event.totalbooked ?? 0;
    if (currentBooked + seatsBooked > event.totalCapacity) {
      throw new BadRequestException('Not enough seats available');
    }

    // Check if user already booked this event
    const existingBooking = await this.bookingRepository.findOne({
      where: { user: { id: user.id }, event: { id: event.id } },
    });
    if (existingBooking) {
      throw new BadRequestException('You have already booked this event');
    }

    // Create new booking
    const booking = this.bookingRepository.create({
      user,
      userEmail,
      event,
      eventName,
      seatsBooked,
    });

    // Save booking and update event totalbooked atomically
    await this.bookingRepository.manager.transaction(async (manager) => {
      await manager.save(booking);

      event.totalbooked = currentBooked + seatsBooked;
      await manager.save(event);
    });

    return {
      message: 'Booking successful',
      booking,
    };
  }

  // Retrieve all bookings by user email
  async getUserBookings(userEmail: string): Promise<Booking[]> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    return this.bookingRepository.find({
      where: { user: { id: user.id } },
      relations: ['event'],
      order: { bookedAt: 'DESC' },
    });
  }
}
