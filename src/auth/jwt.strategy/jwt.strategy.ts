import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Should match in JwtModule
    });
  }

 async validate(payload: any) {
  return {
    userId: payload.sub,
    email: payload.email,
    username: payload.username,
    role: payload.role, // ← Add this line
  };
}

}
