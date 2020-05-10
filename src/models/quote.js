
class Quote {
    constructor(
        provider,
        symbol,
        open,
        high,
        low,
        price,
        previousPrice,
        date
    ) {
        this.provider = provider;
        this.symbol = symbol;
        this.open = open;
        this.high = high;
        this.low = low;
        this.price = price;
        this.previousPrice = previousPrice;
        this.date = date;
    }

    fromJSON(json) {
        return new Quote(json.provider, json.symbol, json.open, json.high, json.low, json.price, json.previousPrice, json.date);
    }
}

module.exports = Quote;