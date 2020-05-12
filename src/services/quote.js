module.exports.QuoteService = injections => {
    // arrange
    const PROVIDER = injections.process.env.PROVIDER;
    const provider = require('../providers');
    // getting proper function for selected provider settle in env.PROVIDER
    const getQuote = provider.GetQuote(PROVIDER).bind(null, injections);
    const getSymbols = provider.GetSymbols(PROVIDER).bind(null, injections);


    // public functions
    return { getQuote, getSymbols };

};
