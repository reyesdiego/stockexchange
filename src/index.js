const envSchema = require('env-schema');
const path = require('path');
const env = require('./config/environment');
// Environment variables.
env({envSchema, path});


const fastify = require('fastify')({
    logger: true
});

// Register Swagger
const swaggerConfig = require('./config/swagger');
fastify.register(require('fastify-swagger'), swaggerConfig);

const start = async () => {
    try {
        fastify
            .register(require('fastify-helmet'))
            .register(require('fastify-cors'), {})
            .register(require('fastify-compress'), { global: false })
            .register(require('./routes/server'))
            .register(require('./routes/quote'), { prefix: '/quote' })

        await fastify
            .listen(process.env.PORT, '::')
            .catch(err => {
                fastify.log.error('Error starting server:', err);
                process.exit(1);
            });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
})

// shut down server
function shutdown() {
    // NOTE: server.close is for express based apps
    // If using hapi, use `server.stop`
    fastify.close(function onServerClosed(err) {
        console.log('OK')
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    })
}


start();
