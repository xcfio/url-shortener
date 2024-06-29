declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Database connection URI
             */
            URI: string
        }
    }
}
