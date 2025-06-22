import { Injectable } from '@nestjs/common'
import { Role } from '../../constants/role.constant'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class RoleService {
  private roleClientId: number | null = null
  constructor(private readonly prisma: PrismaService) {}

  async getRoleClientId(): Promise<number> {
    if (this.roleClientId) return this.roleClientId

    const role = await this.prisma.role.findUniqueOrThrow({
      where: {
        name: Role.CLIENT
      }
    })
    this.roleClientId = role.id
    return role.id
  }
}
