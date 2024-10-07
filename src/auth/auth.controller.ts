import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PinCodeDto } from './dtos';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('session/:id')
  async validateSession(@Param('id') id: string) {
    return this.authService.validateIdSession(id);
  }
  @Post('login')
  async login(@Body() body: any) {
    return await this.authService.login(body.email, body.password);
  }
  @Post('validate-pin')
  async validatePin(@Body() body: PinCodeDto) {
    console.log('body', body);
    const isMatch = this.authService.validatePinCode(body.pinCode, body.email);
    if (isMatch) {
      return {
        message: 'Pin code is correct',
        status: 'active',
      };
    } else {
      return {
        message: 'Pin code is incorrect',
        status: 'inactive',
      };
    }
  }
}
