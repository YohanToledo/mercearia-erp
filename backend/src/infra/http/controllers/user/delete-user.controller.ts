import { DeleteUserUseCase } from '@/domain/account/application/use-cases/delete-user'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/users/:id')
export class DeleteUserController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userId: number) {
    if(Number.isNaN(userId))
      throw new BadRequestException('Invalid user id')

    const result = await this.deleteUser.execute({
      userId: Number(userId),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
