import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Booking } from '../booking/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  eventName: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  totalCapacity: number;

  @Column({ nullable: true })
  totalbooked: number;

  // 👇 Relationship with Booking
  @OneToMany(() => Booking, (booking) => booking.event, {
    cascade: true,
  })
  bookings: Booking[];
}
