import { UserStatus } from '@prisma/client'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
  roleId: z.number(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RegisterBodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10),
    name: z.string().min(3),
    phoneNumber: z.string().min(10).max(15),
    confirmPassword: z.string().min(10)
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and confirm password do not match',
        path: ['confirmPassword', 'password']
      })
    }
  })
export class RegisterBodyDto extends createZodDto(RegisterBodySchema) {}
export class UserDto extends createZodDto(UserSchema) {}
