const quote = require('../controllers/quote-controller');

module.exports = async function (fastify) {
    const routes = [
        {
            method: 'GET',
            url: '/',
            schema: {
                tags: ['Stock Series'],
                summary: 'This service returns the latest price information for a quote of your choice.',
                description: 'This service returns the latest price information. To access this endpoint the user must login first to get a token. <b>Use the Register and Login endpoints. With the token go to the Authorize button in this page and set the Authorization token</b>',
                query: {
                    type: 'object',
                    required: ['symbol'],
                    properties: {
                        symbol: {
                            type: 'string',
                            description: 'The symbol of the global security of your choice. For example: symbol=IBM'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        required: ['provider', 'symbol'],
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
            handler: quote.getQuote
        },
        {
            method: 'GET',
            url: '/symbols',
            schema: {
                tags: ['Stock Series'],
                summary: 'this service returns a list of Symbols.',
                description: 'This service returns a list of Symbols that matches with symbol param.',
                query: {
                    type: 'object',
                    required: ['symbol'],
                    properties: {
                        symbol: {
                            type: 'string',
                            description: 'The symbol or part of it to search for: symbol=IB'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                provider: { type: 'string', description: 'API Service Provider' },
                                symbol: { type: 'string', description: 'Symbol' },
                                name: { type: 'string', description: 'Description of the symbol' }
                            }
                        },
                        example: [
                            {
                                provider: 'Alpha Vantage',
                                symbol: 'IBM',
                                name: 'International Business Machines Corporation'
                            }
                        ]
                    }
                }
            },
            handler: quote.getSymbols
        }

    ];

    routes.forEach((route) => {
        fastify.route(route);
    });
};
