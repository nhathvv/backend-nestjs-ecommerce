import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

@Injectable()
export class HashingService {
  private readonly saltRounds: number = 10

  async hash(value: string): Promise<string> {
    return hash(value, this.saltRounds)
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash)
  }
}
