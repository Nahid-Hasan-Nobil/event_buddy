import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_jwt_secret',  // move to .env for production
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
