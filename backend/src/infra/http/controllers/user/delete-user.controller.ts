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
  async handle(@Param('id') userId: string) {
    const result = await this.deleteUser.execute({
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
