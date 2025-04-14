import { z } from 'zod'

import { FetchPermissionsUseCase } from '@/domain/account/application/use-cases/fetch-permissions'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { PermissionPresenter } from '../../presenters/permission.presenter'
import { Public } from '@/infra/auth/authentication/public'

const PermissionQueryParamsSchema = PaginationQueryParamsSchema.extend({})

type PermissionQueryParams = z.infer<typeof PermissionQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(PermissionQueryParamsSchema)

@Controller('roles/permissions')
export class FetchPermissionsController {
  constructor(private fetchPermissions: FetchPermissionsUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: PermissionQueryParams,
  ) {
    const { page, limit } = query

    const result = await this.fetchPermissions.execute({
      page,
      limit,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { permissions, totalElements } = result.value

    return ContentWithPaginationPresenter(
      permissions.map(PermissionPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
