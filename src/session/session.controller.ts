import { Controller, Param, Post, UseGuards} from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('revoke/:sessionId')
  @Roles(Role.PLATFORM_ADMIN)
  async revokeSession(@Param('sessionId') sessionId: string) {
    await this.sessionService.revokeSession(sessionId);
    return { message: 'Session revoked successfully' };
  }

  @Post('revoke-all/:userId')
  @Roles(Role.PLATFORM_ADMIN)
  async revokeAllSessions(@Param('userId') userId: string) {
    await this.sessionService.revokeAllUserSessions(userId);
    return { message: 'All sessions revoked successfully' };
  }
}
