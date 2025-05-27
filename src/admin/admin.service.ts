import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAdminDto): Promise<{ message: string; admin: Omit<Admin, 'password'> }> {
    const { fullName, email, password } = registerDto;

    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await this.adminRepository.save(admin);

    const { password: _, ...adminWithoutPassword } = savedAdmin;
    return {
      message: 'Admin registered successfully',
      admin: adminWithoutPassword,
    };
  }

  async login(loginDto: LoginAdminDto): Promise<{ message: string; accessToken: string }> {
    const { email, password } = loginDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email, role: admin.role  };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
    };
  }

  async deleteAdmin(adminId: number): Promise<{ message: string }> {
    const result = await this.adminRepository.delete(adminId);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
    return {
      message: `Admin with ID ${adminId} deleted successfully`,
    };
  }
}
