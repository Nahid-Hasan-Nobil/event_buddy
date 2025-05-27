import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<{ message: string; user: Omit<User, 'password'> }> {
    const { fullName, email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const savedUser = await this.userRepository.save(user);

    await this.mailService.sendRegistrationEmail(savedUser.email, savedUser.fullName);

    const { password: _, ...userWithoutPassword } = savedUser;
    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginUserDto): Promise<{ message: string; accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
    };
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      message: `User with ID ${userId} deleted successfully`,
    };
  }
}
