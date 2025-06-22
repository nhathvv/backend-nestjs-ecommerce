import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { RegisterBodyDto, UserDto } from './auth.dto'
import { ZodSerializerDto } from 'nestjs-zod'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(UserDto)
  async register(@Body() body: RegisterBodyDto) {
    return this.authService.register(body)
  }
}
