/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
const { QuoteService } = require("../services/quote");

describe('QUOTE', function () {
    test('Should return quotes with no errors', async () => {
        // Arrange
        const mockResult = require('../test/mocks/quote-alphavantage.json');
        const { Quote } = require('../models');
        const process = {
            env: {
                PROVIDER: 'ALPHA_VANTAGE', ALPHA_VANTAGE_KEY: '66YXZOUXSWNRCJQZ', ALPHA_VANTAGE_URL: 'https://www.alphavantage.co/', ALPHA_VANTAGE_NAME: "Alpha Vantage"

            }
        };
        const axios = jest.fn().mockReturnValue(Promise.resolve({
            data: mockResult
        }));
        const symbol = 'IBM';
        const quoteService = QuoteService({ axios, model: Quote, process }, symbol);

        // Act
        const data = await quoteService.getQuote(symbol);

        // Asserts
        expect(axios).toBeCalledWith({
            method: "get",
            baseURL: 'https://www.alphavantage.co/',
            url: `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=66YXZOUXSWNRCJQZ`
        });
        expect(data).toHaveProperty('provider');
        expect(data).toHaveProperty('symbol');
        expect(data).toHaveProperty('open');
        expect(data).toHaveProperty('high');
        expect(data).toHaveProperty('low');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('previousPrice');
        expect(data).toHaveProperty('date');
    });

    test('Should not return quotes, must throw an error', async () => {
        // Arrange
        const axios = jest.fn().mockRejectedValue(new Error('Mocked Error'));
        const process = {
            env: {
                PROVIDER: 'ALPHA_VANTAGE', ALPHA_VANTAGE_KEY: '66YXZOUXSWNRCJQZ', ALPHA_VANTAGE_URL: 'https://www.alphavantage.co/', ALPHA_VANTAGE_NAME: "Alpha Vantage"
            }
        };
        const quoteService = QuoteService({ axios, process });

        // Act & Assert
        await expect(quoteService.getQuote()).rejects.toThrow('Mocked Error');
    });
});

describe('SYMBOLS', function () {
    test('Should return symbols with no errors', async () => {
        // Arrange
        const mockResult = require('../test/mocks/symbols-alphavantage.json');
        const { Symbol } = require('../models');
        const process = {
            env: {
                PROVIDER: 'ALPHA_VANTAGE', ALPHA_VANTAGE_KEY: '66YXZOUXSWNRCJQZ', ALPHA_VANTAGE_URL: 'https://www.alphavantage.co/', ALPHA_VANTAGE_NAME: "Alpha Vantage"
            }
        };
        const axios = jest.fn().mockReturnValue(Promise.resolve({
            data: mockResult
        }));
        const symbol = 'IBM';
        const quoteService = QuoteService({ axios, model: Symbol, process }, symbol);

        // Act
        const data = await quoteService.getSymbols(symbol);

        // Asserts
        expect(axios).toBeCalledWith({
            method: "get",
            baseURL: 'https://www.alphavantage.co/',
            url: `/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=66YXZOUXSWNRCJQZ`
        });
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty('provider');
        expect(data[0]).toHaveProperty('symbol');
        expect(data[0]).toHaveProperty('name');

    });
});

