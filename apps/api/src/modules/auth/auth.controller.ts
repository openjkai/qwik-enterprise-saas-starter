import { Role } from '@prisma/client';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { loginSchema, registerSchema } from '@qwik-enterprise-saas/shared';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema))
    dto: { email: string; password: string },
  ) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginSchema))
    dto: { email: string; password: string },
  ) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: { user: { id: string; email: string; memberships: unknown[] } }) {
    const { passwordHash: _, ...user } = req.user as { id: string; email: string; passwordHash: string; memberships: unknown[] };
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  @Get('admin')
  async adminOnly() {
    return { message: 'Admin or Owner only' };
  }
}
