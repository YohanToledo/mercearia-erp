import { Entity } from "@/core/entities/entity"

export interface RoleProps {
    name: string
}

export class Role extends Entity<RoleProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    static create(props: RoleProps, id?: number) {
        return new Role(props, id ?? 0)
    }
}