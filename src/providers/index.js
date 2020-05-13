const alphaVantage = require('./alpha-vantage');
const fakeProvider = require('./fake-backup-provider');
const { ALPHA_VANTAGE, FAKE_PROVIDER } = require('./constants');

module.exports.GetSymbols = (provider) => {
    if (provider === ALPHA_VANTAGE) {
        return alphaVantage.GetSymbols;
    } else if (provider === FAKE_PROVIDER) {
        return fakeProvider.GetSymbols;
    }
};

module.exports.GetQuote = (provider) => {
    if (provider === ALPHA_VANTAGE) {
        return alphaVantage.GetQuote;
    } else if (provider === FAKE_PROVIDER) {
        return fakeProvider.GetQuote;
    }
};
