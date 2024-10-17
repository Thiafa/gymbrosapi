"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var fastify_1 = require("fastify");
var jwt_1 = require("@fastify/jwt");
var cookie_1 = require("@fastify/cookie");
var cors_1 = require("@fastify/cors");
var zod_1 = require("zod");
var env_1 = require("./env");
// import { usersRoutes } from './http/controllers/user/routes'
exports.app = (0, fastify_1.default)();
exports.app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '1d'
    }
});
exports.app.register(cors_1.default, {
    origin: true,
    // origin: ['http://localhost:5173'], // Substitua pelo seu endereço de front-end
    credentials: true // Permitir credenciais
});
exports.app.register(cookie_1.default);
// app.register(usersRoutes)
exports.app.setErrorHandler(function (error, _, reply) {
    if (error instanceof zod_1.ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }
    if (env_1.env.NODE_ENV !== 'production') {
        console.error(error);
    }
    else {
        // TODO: tratar error com logs futuros
    }
    return reply.status(500).send({ message: 'Internal server error.' });
});
