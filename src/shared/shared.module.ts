import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from './guards/access-token.guard'
import { APIKeyGuard } from './guards/api-key.guard'
import { AuthenticationGuard } from './guards/authentication.guard'
import { HashingService } from './services/hashing.service'
import { PrismaService } from './services/prisma.service'
import { TokenService } from './services/token.service'

@Global()
@Module({
  providers: [
    PrismaService,
    HashingService,
    TokenService,
    APIKeyGuard,
    AccessTokenGuard,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard
    }
  ],
  exports: [PrismaService, HashingService, TokenService],
  imports: [JwtModule]
})
export class SharedModule {}
