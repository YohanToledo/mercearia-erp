export class Entity<Props> {
  protected readonly _id: number
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id: number) {
    this.props = { ...props }
    this._id = id
  }

  public equals(entity: Entity<unknown>): boolean {
    return entity.id === this._id
  }
}