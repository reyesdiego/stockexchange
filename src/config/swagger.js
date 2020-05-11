module.exports = {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Modusbox - Exchange Ticker - API",
      description: "Microservice geeting information from Exchanges",
      version: "1.0.0"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    host: `localhost:${process.env.PORT}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      authorization: {
        name: 'authorization',
        type: 'apiKey',
        in: 'header'
      }
    },
    security: [{ authorization: [] }]
  }
};
