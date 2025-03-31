import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { UserService } from 'src/user/user.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private userService: UserService
  ) { }

  async createOrUpdateSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const { userId, refreshToken, device } = createSessionDto;
  
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
  
    let session = await this.sessionRepository.findOne({
      where: { user: { id: userId }, device, isRevoked: false }
    });
  
    if (session) {
      session.refreshToken = refreshToken;
    } else {
      session = this.sessionRepository.create({
        user,
        refreshToken,
        device
      });
    }
  
    try {
      return await this.sessionRepository.save(session);
    } catch (error) {
      throw new UnprocessableEntityException(`Failed to create or update Session: ${error.message}`);
    }
  }

  async findSessionByRefreshToken(refreshToken: string): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { refreshToken, isRevoked: false },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Session with ID "${sessionId}" not found`);
    }

    session.isRevoked = true;
    await this.sessionRepository.save(session);
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.update(
      { user: { id: userId }, isRevoked: false },
      { isRevoked: true }
    );
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      return false;
    }

    const isValid = !session.isRevoked;
    
    if (!isValid) {
      session.isRevoked = true;
      await this.sessionRepository.save(session);
    }

    return isValid;
  }
}