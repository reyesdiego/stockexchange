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
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
};
