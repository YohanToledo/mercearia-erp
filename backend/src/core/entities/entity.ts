import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = { ...props }
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) return true
    return entity.id.equals(this._id)
  }
}
