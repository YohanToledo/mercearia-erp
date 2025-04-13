import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { RoleRepository } from '../repositories/role.repository'
import { PermissionNotFoundError } from './errors/permission-not-found-error'
import { Role } from '../../enterprise/entities/role'
import { PermissionRepository } from '../repositories/permission.repository'

interface CreateRoleUseCaseRequest {
  name: string
  description: string
  active?: boolean
  permissions: number[]
}

type CreateRoleUseCaseResponse = Either<PermissionNotFoundError, Role>

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) { }

  async execute(
    request: CreateRoleUseCaseRequest,
  ): Promise<CreateRoleUseCaseResponse> {
    const { name, description, active = true, permissions: permissionIds } = request

    const permissions = await this.permissionRepository.findManyByIds(permissionIds)

    console.log(permissions)

    if (permissions.length !== permissionIds.length) {
      return left(new PermissionNotFoundError())
    }

    const role = Role.create({
      name,
      description,
      active,
      permissions
    })

    console.log(role)

    const createdRole = await this.roleRepository.create(role)

    return right(createdRole)
  }
}
