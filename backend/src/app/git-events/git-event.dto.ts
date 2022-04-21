export interface EventPayload {
    repository: {
        id: number
    }
    commits: {
        id: string
        message: string
        url: string
        timestamp: string
    }[]
}
