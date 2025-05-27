import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable in production
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
