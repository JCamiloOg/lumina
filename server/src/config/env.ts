import "dotenv/config.js";



const { PORT, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY, CORS_ORIGIN, NODE_ENV, DATABASE_URL, DB_HOST } = process.env;

export {
    DB_HOST,
    PORT,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    SECRET_KEY,
    CORS_ORIGIN,
    NODE_ENV,
    DATABASE_URL
};
