export interface Session {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
}

export interface SessionCreate {
    userId: string
    token: string
    expiresAt: Date
}
