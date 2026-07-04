declare namespace NodeJS {
    export interface ProcessEnv {
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        PORT: number;
        SECRET_KEY: string;
        CORS_ORIGIN: string;
        NODE_ENV: 'development' | 'production';
        DATABASE_URL: string;
    }
}