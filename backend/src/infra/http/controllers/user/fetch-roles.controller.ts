import { z } from 'zod'

import { FetchRolesUseCase } from '@/domain/account/application/use-cases/fetch-roles'
import { BadRequestException, Controller, Get, HttpCode, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { Public } from '@/infra/auth/authentication/public'
import { RolePresenter } from '../../presenters/role.presenter'

const RoleQueryParamsSchema = PaginationQueryParamsSchema.extend({})

type RoleQueryParams = z.infer<typeof RoleQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(RoleQueryParamsSchema)

@Public()
@Controller('roles')
export class FetchRolesController {
  constructor(private fetchRoles: FetchRolesUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Query(queryValidationPipe) query: RoleQueryParams,
  ) {
    const { page, limit } = query

    const result = await this.fetchRoles.execute({
      page,
      limit,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { roles, totalElements } = result.value

    return ContentWithPaginationPresenter(
      roles.map(RolePresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
