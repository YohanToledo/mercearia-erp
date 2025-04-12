import { Entity } from '@/core/entities/entity'
import { Role } from './role'

export interface UserProps {
  name: string
  username: string
  email: string | null
  password: string
  active: boolean
  roles?: Role[]
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get username() {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get email() {
    return this.props.email
  }

  set email(email: string | null) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get active() {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: UserProps, id?: number) {
    return new User(props, id ?? 0)
  }

  update(props: Partial<UserProps>): void {
    Object.assign(this.props, props)
  }
}
