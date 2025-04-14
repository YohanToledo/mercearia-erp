import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repository'
import { UserRepository } from '@/domain/account/application/repositories/user.repository'
import { ProductRepository } from '@/domain/product/application/repositories/product.repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-product.repository'
import { ProductCategoryRepository } from '@/domain/product/application/repositories/product-category.repository'
import { PrismaProductCategoryRepository } from './prisma/repositories/prisma-product-category.repository'
import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository'
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer.repository'
import { PermissionRepository } from '@/domain/account/application/repositories/permission.repository'
import { PrismaPermissionRepository } from './prisma/repositories/prisma-permission.repository'
import { RoleRepository } from '@/domain/account/application/repositories/role.repository'
import { PrismaRoleRepository } from './prisma/repositories/prisma-role.repository'
import { SupplierRepository } from '@/domain/supplier/application/repositories/supplier.repository'
import { PrismaSupplierRepository } from './prisma/repositories/prisma-supplier.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: ProductCategoryRepository,
      useClass: PrismaProductCategoryRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: PermissionRepository,
      useClass: PrismaPermissionRepository,
    },
    {
      provide: RoleRepository,
      useClass: PrismaRoleRepository,
    },
    {
      provide: SupplierRepository,
      useClass: PrismaSupplierRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    ProductCategoryRepository,
    CustomerRepository,
    PermissionRepository,
    RoleRepository,
    SupplierRepository,
  ],
})
export class DatabaseModule {}
