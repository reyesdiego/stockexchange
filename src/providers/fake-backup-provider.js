module.exports.GetSymbols = async function ({ model, process }, symbol) {
    const fakeSymbols = [];
    // eslint-disable-next-line no-plusplus
    for (let idx = 0; idx < 10; idx++) {
        fakeSymbols.push(new model(
            process.env.FAKE_PROVIDER_NAME,
            `Fake Symbol ${symbol} ${idx}`,
            `Fake Name ${idx}`
        ));
    }
    return Promise.resolve(fakeSymbols);
};

module.exports.GetQuote = async function ({ model, process }, symbol) {
    return Promise.resolve(new model(
        process.env.FAKE_PROVIDER_NAME,
        `Fake Symbol ${symbol}`,
        100,
        120,
        90,
        98,
        95,
        "2020-05-10"
    ));
};


