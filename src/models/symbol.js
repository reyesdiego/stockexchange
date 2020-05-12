
class Symbol {
    constructor(
        provider,
        symbol,
        name
    ) {
        this.provider = provider;
        this.symbol = symbol;
        this.name = name;
    }

    fromJSON(json) {
        return new Symbol(json.provider, json.symbol, json.name);
    }
}

module.exports = Symbol;