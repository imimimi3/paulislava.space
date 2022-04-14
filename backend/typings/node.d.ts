declare namespace NodeJS {
    interface ProcessEnv {
        GITHUB_HOOK_SECRET: string
        BACKEND_PORT: number
    }
}