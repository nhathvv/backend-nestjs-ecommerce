import { BadRequestException, Injectable } from '@nestjs/common'
import { RoleService } from './role.service'
import { PrismaService } from '../../services/prisma.service'
import { HashingService } from '../../services/hashing.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService
  ) {}

  async register(body: any) {
    const { email, password, name, phoneNumber } = body
    try {
      const roleClientId = await this.roleService.getRoleClientId()
      const isEmailExist = await this.prisma.user.findFirst({
        where: {
          email
        }
      })
      if (isEmailExist) {
        throw new BadRequestException('Email already exists')
      }
      const hashedPassword = await this.hashingService.hash(password)
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phoneNumber,
          roleId: roleClientId
        },
        omit: {
          totpSecret: true
        }
      })
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
