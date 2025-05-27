import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userEmail: string; // Redundant for quick search/reporting

  @ManyToOne(() => Event, (event) => event.bookings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  event: Event;

  @Column()
  eventName: string; // Redundant for quick search/reporting

  @Column()
  seatsBooked: number;

  @CreateDateColumn()
  bookedAt: Date;
}
