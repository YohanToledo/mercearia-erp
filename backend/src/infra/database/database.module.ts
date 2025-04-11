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
  ],
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    ProductCategoryRepository,
    CustomerRepository,
  ],
})
export class DatabaseModule {}
