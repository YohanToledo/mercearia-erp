export interface Permission {
    id?: number
    name: string
    description: string
    resource: string
}

export interface Role {
    id?: number
    name: string
    description: string
    active: boolean
    permissions: Permission[]
}