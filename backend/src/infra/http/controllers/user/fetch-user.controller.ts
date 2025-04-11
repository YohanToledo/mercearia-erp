import { FetchUserUseCase } from '@/domain/account/application/use-cases/fetch-user'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { UserPresenter } from '../../presenters/user.presenter'

@Controller('/users/:id')
export class FetchUserController {
  constructor(private fetchUser: FetchUserUseCase) { }

  @Get()
  async handle(@Param('id') userId: number) {
    const result = await this.fetchUser.execute({ id: Number(userId) })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { user } = result.value

    return UserPresenter.toHTTP(user)
  }
}
