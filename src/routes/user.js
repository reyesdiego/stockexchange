//@ts-check
const user = require('../controllers/users');

module.exports = async function (fastify, opts, next) {
    const routes = [
        {
            method: 'POST',
            url: '/login',
            schema: {
                tags: ['Auth'],
                body: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email.'
                        },
                        password: {
                            type: 'string',
                            description: 'User Password.'
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
