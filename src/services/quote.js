module.exports.QuoteService = (injections) => {

    const getQuote = GetQuote.bind(null, injections)
    const getSymbols = GetSymbols.bind(null, injections);
    return { getQuote, getSymbols };

    async function GetSymbols({ axios, model, process }, symbol) {
        try {
            const response = await axios({
                method: "get",
                baseURL: process.env.ALPHA_VANTAGE_URL,
                url: `/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
            });
            const metaData = response.data['bestMatches'];
            return metaData.map(symbol => (
                new model(
                    process.env.ALPHA_VANTAGE_NAME,
                    symbol['1. symbol'],
                    symbol['2. name'])
            ));

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function GetQuote({ axios, model, process }, symbol) {
        try {
            const response = await axios({
                method: "get",
                baseURL: process.env.ALPHA_VANTAGE_URL,
                url: `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
            });
            if (response.data.Note) {
                throw Error(response.data.Note);
            }
            const metaData = response.data['Global Quote'];
            return new model(
                process.env.ALPHA_VANTAGE_NAME,
                metaData['01. symbol'],
                metaData['02. open'],
                metaData['03. high'],
                metaData['04. low'],
                metaData['05. price'],
                metaData['08. previous close'],
                metaData['07. latest trading day']);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}