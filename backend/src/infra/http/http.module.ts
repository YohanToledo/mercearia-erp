
import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/user/create-user.controller'
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
import { MailModule } from '../mail/mail.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { MessagingModule } from '../messaging/messaging.module'
import { AuthenticateController } from './controllers/auth/authenticate.controller'
import { ValidateTokenController } from './controllers/auth/validate-token.controller'
import { CreateProductController } from './controllers/product/create-product.controller'
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product'
import { FetchProductCategoriesController } from './controllers/product/fetch-categories.controller'
import { FetchProductCategoriesUseCase } from '@/domain/product/application/use-cases/fetch-categories'
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
import { FetchPermissionsUseCase } from '@/domain/account/application/use-cases/fetch-permissions'
import { FetchPermissionsController } from './controllers/role/fetch-permissions.controller'
import { CreateRoleController } from './controllers/role/create-role.controller'
import { CreateRoleUseCase } from '@/domain/account/application/use-cases/create-role'
import { FetchRolesUseCase } from '@/domain/account/application/use-cases/fetch-roles'
import { FetchRolesController } from './controllers/role/fetch-roles.controller'
import { CreateProductCategoryController } from './controllers/product/create-category.controller'
import { CreateProductCategoryUseCase } from '@/domain/product/application/use-cases/create-category'
import { UpdateProductCategoryUseCase } from '@/domain/product/application/use-cases/update-category'
import { UpdateProductCategoryController } from './controllers/product/update-category.controller'
import { FetchProductCategoryController } from './controllers/product/fetch-category.controller'
import { FetchProductCategoryUseCase } from '@/domain/product/application/use-cases/fetch-category'
import { CreateSupplierUseCase } from '@/domain/supplier/application/use-cases/create-supplier'
import { UpdateSupplierUseCase } from '@/domain/supplier/application/use-cases/update-supplier'
import { FetchSuppliersUseCase } from '@/domain/supplier/application/use-cases/fetch-suppliers'
import { FetchSupplierUseCase } from '@/domain/supplier/application/use-cases/fetch-supplier'
import { CreateSupplierController } from './controllers/supplier/create-supplier.controller'
import { UpdateSupplierController } from './controllers/supplier/update-supplier.controller'
import { FetchSuppliersController } from './controllers/supplier/fetch-suppliers.controller'
import { FetchSupplierController } from './controllers/supplier/fetch-supplier.controller'
import { LogService } from '@/domain/log/application/services/log.service'
import { CreateExpenseCategoryController } from './controllers/expense/create-category.controller'
import { UpdateExpenseCategoryController } from './controllers/expense/update-category.controller'
import { FetchExpenseCategoriesController } from './controllers/expense/fetch-categories.controller'
import { FetchExpenseCategoryController } from './controllers/expense/fetch-category.controller'
import { FetchExpenseCategoriesUseCase } from '@/domain/expense/application/use-cases/fetch-categories'
import { CreateExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/create-category'
import { UpdateExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/update-category'
import { FetchExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/fetch-category'
import { CreateExpenseUseCase } from '@/domain/expense/application/use-cases/create-expense'
import { UpdateExpenseUseCase } from '@/domain/expense/application/use-cases/update-expense'
import { FetchExpensesUseCase } from '@/domain/expense/application/use-cases/fetch-expenses'
import { FetchExpenseUseCase } from '@/domain/expense/application/use-cases/fetch-expense'
import { CreateExpenseController } from './controllers/expense/create-expense.controller'
import { UpdateExpenseController } from './controllers/expense/update-expense.controller'
import { FetchExpensesController } from './controllers/expense/fetch-expenses.controller'
import { FetchExpenseController } from './controllers/expense/fetch-expense.controller'
import { FetchPaymentMethodController } from './controllers/payment/fetch-method.controller'
import { FetchPaymentMethodsController } from './controllers/payment/fetch-methods.controller'
import { FetchPaymentMethodUseCase } from '@/domain/payment/application/use-cases/fetch-method'
import { FetchPaymentMethodsUseCase } from '@/domain/payment/application/use-cases/fetch-methods'

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
    FetchPermissionsController,
    CreateRoleController,
    FetchRolesController,
    CreateProductCategoryController,
    UpdateProductCategoryController,
    FetchProductCategoryController,
    CreateSupplierController,
    UpdateSupplierController,
    FetchSuppliersController,
    FetchSupplierController,
    CreateExpenseCategoryController,
    UpdateExpenseCategoryController,
    FetchExpenseCategoriesController,
    FetchExpenseCategoryController,
    CreateExpenseController,
    UpdateExpenseController,
    FetchExpensesController,
    FetchExpenseController,
    FetchPaymentMethodController,
    FetchPaymentMethodsController,
  ],
  providers: [
    LogService,
    AuthenticateUseCase,
    ValidateTokenUseCase,
    FetchUsersUseCase,
    FetchUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    CreateProductUseCase,
    FetchProductCategoriesUseCase,
    FetchProductsUseCase,
    FetchProductUseCase,
    UpdateProductUseCase,
    CreateCustomerUseCase,
    FetchCustomersUseCase,
    FetchCustomerUseCase,
    UpdateCustomerUseCase,
    FetchPermissionsUseCase,
    CreateRoleUseCase,
    FetchRolesUseCase,
    CreateProductCategoryUseCase,
    UpdateProductCategoryUseCase,
    FetchProductCategoryUseCase,
    CreateSupplierUseCase,
    FetchSuppliersUseCase,
    FetchSupplierUseCase,
    UpdateSupplierUseCase,
    CreateExpenseCategoryUseCase,
    UpdateExpenseCategoryUseCase,
    FetchExpenseCategoriesUseCase,
    FetchExpenseCategoryUseCase,
    CreateExpenseUseCase,
    UpdateExpenseUseCase,
    FetchExpensesUseCase,
    FetchExpenseUseCase,
    FetchPaymentMethodUseCase,
    FetchPaymentMethodsUseCase,
  ],
})
export class HttpModule {}
