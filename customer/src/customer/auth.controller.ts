import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorators';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { accessToken, refreshToken } = await this.authService.signUp(
      createUserDto,
    );
    return { accessToken, refreshToken };
  }

  @Public()
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request & { user: any }) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('test')
  test(
    @Req() req: Request & { user: any },
    @GetCurrentUserId() decoratorUserId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    const userId = req.user['sub'];

    return 'ok';
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Req() req: Request & { user: any },
    @GetCurrentUser('refreshToken') refreshTokenMy: string,
  ) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
