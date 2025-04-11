
import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/user/create-user.controller'
import { DeleteUserController } from './controllers/user/delete-user.controller'
import { FetchUserController } from './controllers/user/fetch-user.controller'
import { FetchUsersController } from './controllers/user/fetch-users.controller'
import { UpdateUserController } from './controllers/user/update-user.controller'
import { EnvModule } from '../env/env.module'
import { AuthModule } from '../auth/auth.module'
import { CacheModule } from '@nestjs/cache-manager'
import { AuthenticateUseCase } from '@/domain/account/application/use-cases/authenticate'
import { ValidateTokenUseCase } from '@/domain/account/application/use-cases/validate-token'
import { FetchUsersUseCase } from '@/domain/account/application/use-cases/fetch-users'
import { FetchUserUseCase } from '@/domain/account/application/use-cases/fetch-user'
import { CreateUserUseCase } from '@/domain/account/application/use-cases/create-user'
import { UpdateUserUseCase } from '@/domain/account/application/use-cases/update-user'
import { DeleteUserUseCase } from '@/domain/account/application/use-cases/delete-user'
import { MailModule } from '../mail/mail.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { MessagingModule } from '../messaging/messaging.module'
import { AuthenticateController } from './controllers/auth/authenticate.controller'
import { ValidateTokenController } from './controllers/auth/validate-token.controller'
import { CreateProductController } from './controllers/product/create-product.controller'
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product'
import { FetchProductCategoriesController } from './controllers/product/fetch-categories.controller'
import { FetchProductCategoriesUseCase } from '@/domain/product/application/use-cases/fetch-product-categories'
import { FetchProductsController } from './controllers/product/fetch-products.controller'
import { FetchProductsUseCase } from '@/domain/product/application/use-cases/fetch-products'
import { FetchProductController } from './controllers/product/fetch-product.controller'
import { UpdateProductController } from './controllers/product/update-product.controller'
import { FetchProductUseCase } from '@/domain/product/application/use-cases/fetch-product'
import { UpdateProductUseCase } from '@/domain/product/application/use-cases/update-product'
import { CreateCustomerController } from './controllers/customer/create-customer.controller'
import { FetchCustomersController } from './controllers/customer/fetch-customers.controller'
import { FetchCustomerController } from './controllers/customer/fetch-customer.controller'
import { UpdateCustomerController } from './controllers/customer/update-customer.controller'
import { CreateCustomerUseCase } from '@/domain/customer/application/use-cases/create-customer'
import { FetchCustomersUseCase } from '@/domain/customer/application/use-cases/fetch-customers'
import { FetchCustomerUseCase } from '@/domain/customer/application/use-cases/fetch-customer'
import { UpdateCustomerUseCase } from '@/domain/customer/application/use-cases/update-customer'

@Module({
  imports: [
    EnvModule,
    MailModule,
    AuthModule,
    CryptographyModule,
    DatabaseModule,
    MessagingModule,
    CacheModule.register({
      ttl: 5000,
      max: 10,
    }),
  ],
  controllers: [
    FetchUsersController,
    FetchUserController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    UpdateUserController,
    AuthenticateController,
    ValidateTokenController,
    CreateProductController,
    FetchProductCategoriesController,
    FetchProductsController,
    FetchProductController,
    UpdateProductController,
    CreateCustomerController,
    FetchCustomersController,
    FetchCustomerController,
    UpdateCustomerController,
  ],
  providers: [
    AuthenticateUseCase,
    ValidateTokenUseCase,
    FetchUsersUseCase,
    FetchUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CreateProductUseCase,
    FetchProductCategoriesUseCase,
    FetchProductsUseCase,
    FetchProductUseCase,
    UpdateProductUseCase,
    CreateCustomerUseCase,
    FetchCustomersUseCase,
    FetchCustomerUseCase,
    UpdateCustomerUseCase,
  ],
})
export class HttpModule {}
