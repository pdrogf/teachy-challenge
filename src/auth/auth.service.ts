import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    
    if (!user || !await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user, loginDto.device);
  }

  async refreshToken(refreshToken: string) {
    const session = await this.sessionService.findSessionByRefreshToken(refreshToken);
    
    if (!session || session.isRevoked) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findById(session.user.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user, session.device);
  }

  async validateGoogleUser(profile: any): Promise<User> {
    const { email, firstName, lastName } = profile;
    let user = await this.userService.findByEmail(email);
    
    if (!user) {
      user = await this.userService.create({
        email,
        name: `${firstName} ${lastName}`,
        password: crypto.randomBytes(20).toString('hex'), 
      });
    }

    return user;
  }

  async loginWithGoogle(user: User, device: string) {
    return this.generateTokens(user, device);
  }

  private async generateTokens(user: User, device: string) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = crypto.randomBytes(40).toString('hex');

    await this.sessionService.createOrUpdateSession({
      userId: user.id,
      refreshToken,
      device,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }
}