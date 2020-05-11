const quote = require('../controllers/quote-controller');

module.exports = async function (fastify, opts, next) {
    const routes = [
        {
            method: 'GET',
            url: '/',
            schema: {
                tags: ['Stock Time Series'],
                summary: 'this service returns the latest price and volume information for a security of your choice.',
                description: 'This service returns the latest price and volume information for a security of your choice.',
                query: {
                    type: 'object',
                    required: ['symbol'],
                    properties: {
                        symbol: {
                            type: 'string',
                            description: 'The symbol of the global security of your choice. For example: symbol=IBM.'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            provider: { type: 'string', description: 'API Service Provider' },
                            symbol: { type: 'string', description: 'Symbol' },
                            open: { type: 'number', description: 'Open price of the day' },
                            high: { type: 'number', description: 'High price of the day' },
                            low: { type: 'number', description: 'Low price of the day' },
                            price: { type: 'number', description: 'Current price' },
                            prevPrice: { type: 'number', description: 'Previous close price' },
                            date: { type: 'string', format: 'date', description: 'Last trading date' }
                        },
                        example:
                        {
                            provider: 'Alpha Vantage',
                            symbol: 'IBM',
                            open: 122.6700,
                            high: 123.2300,
                            low: 121.0600,
                            price: 122.9900,
                            prevPrice: 122.1000,
                            date: '2020-05-08'
                        }
                    }
                }
            },
            preValidation: [fastify.authenticate],
            handler: quote.getQuotes
        }
    ];

    routes.forEach(route => {
        fastify.route(route);
    });
};
