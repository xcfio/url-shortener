declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URI: string
        }
    }
}
