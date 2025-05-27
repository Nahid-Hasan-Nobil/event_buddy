import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // Admin API

  async createEvent(createEventDto: CreateEventDto): Promise<{ message: string; event: Event }> {
    const { eventName } = createEventDto;

    const existingEvent = await this.eventRepository.findOne({ where: { eventName } });
    if (existingEvent) {
      throw new BadRequestException('Event name already exists');
    }

    const event = this.eventRepository.create(createEventDto);
    const savedEvent = await this.eventRepository.save(event);

    return {
      message: 'Event created successfully',
      event: savedEvent,
    };
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto): Promise<{ message: string; event: Event }> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    Object.assign(event, updateEventDto);
    const updatedEvent = await this.eventRepository.save(event);

    return {
      message: 'Event updated successfully',
      event: updatedEvent,
    };
  }

  async deleteEvent(id: number): Promise<{ message: string }> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return {
      message: `Event with ID ${id} deleted successfully`,
    };
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find({
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  // Public API

  async getUpcomingEvents(): Promise<Event[]> {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    return await this.eventRepository.find({
      where: { date: MoreThan(today) },
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async getPreviousEvents(): Promise<Event[]> {
    const today = new Date().toISOString().slice(0, 10);
    return await this.eventRepository.find({
      where: { date: LessThan(today) },
      order: { date: 'DESC', time: 'DESC' },
    });
  }

  async getEventDetailsByName(eventName: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { eventName } });
    if (!event) {
      throw new NotFoundException(`Event with name "${eventName}" not found`);
    }
    return event;
  }
}
