import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Lumina API",
            version: "1.0.0",
            description: "Documentación del uso para la API de lumina - Trabajo React",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },

    apis: ["./src/routes/**/*.ts"],
});