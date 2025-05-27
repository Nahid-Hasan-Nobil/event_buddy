import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Sample method to generate token
  async generateToken(user: any): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
