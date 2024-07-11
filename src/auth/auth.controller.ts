import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { registerAuthDto } from './dto/registerAuth.dto';
import { loginAuthDto } from './dto/loginAuth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  registerUser(@Body() registerObject: registerAuthDto) {
    return this.authService.registerAuth(registerObject);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  loginUser(@Body() loginObject: loginAuthDto) {
    return this.authService.loginAuth(loginObject);
  }
}
