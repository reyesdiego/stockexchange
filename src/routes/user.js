const user = require('../controllers/users');

module.exports = async function (fastify) {
    const routes = [
        {
            method: 'POST',
            url: '/login',
            schema: {
                tags: ['Authorization'],
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email.',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'User Password.',
                            minLength: 6
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            authorization: {
                                type: 'string',
                                description: 'Bearer authentication token'
                            }
                        },
                        example: {
                            authorization: 'Beared eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkyMTE2MDcsInVzZXJfaWQiOiJlZSIsImlhdCI6MTU4OTIxMTQ4N30.UZ6x1fF72bH948PG2PfesM6oPhDtsJoRa3aWNmFs8yk'
                        }
                    },
                    400: {
                        description: 'Bad Request',
                        type: 'object',
                        properties: {
                            statusCode: { type: 'number', description: "http status code" },
                            error: { type: "string", description: 'Error name' },
                            message: { type: 'string', description: "<error message>" }
                        },
                        example: {

                            statusCode: 400,
                            error: "Bad Request",
                            message: "Error Message"

                        }
                    }
                }
            },
            handler: user.login
        }
    ];

    routes.forEach(route => {
        fastify.route(route);
    });
};
