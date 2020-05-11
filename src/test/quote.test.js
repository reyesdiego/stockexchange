const dotenv = require('dotenv');
dotenv.config();
const { QuoteService } = require("../services/quote");

describe('QUOTE', function () {
    test('Should return quotes with no errors', async () => {
        // Arrange
        const mockResult = require('../test/mocks/quote-alphavantage.json');
        const model = require('../models/quote');
        const process = {
            env: {
                ALPHA_VANTAGE_KEY: '66YXZOUXSWNRCJQZ', ALPHA_VANTAGE_URL:'https://www.alphavantage.co/'

            }
        };
        const axios = jest.fn().mockReturnValue(Promise.resolve({
            data: mockResult
        }));
        const symbol = 'IBM';
        const quoteService = QuoteService({ axios, model, process }, symbol);

        // Act
        const data = await quoteService.getQuote(symbol);

        // Asserts
        expect(axios).toBeCalledWith({
            method: "get",
            baseURL: 'https://www.alphavantage.co/',
            url: `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=66YXZOUXSWNRCJQZ`
        });
        expect(data).toHaveProperty('open');
        expect(data).toHaveProperty('high');
        expect(data).toHaveProperty('low');
        expect(data).toHaveProperty('price');
    });

    test('Should not return quotes, must throw an error', async () => {
        // Arrange
        const axios = jest.fn().mockRejectedValue(new Error('Mocked Error'));
        const process = {
            env: {
                ALPHA_VANTAGE_KEY: '66YXZOUXSWNRCJQZ', ALPHA_VANTAGE_URL:'https://www.alphavantage.co/'
            }
        };
        const quoteService = QuoteService({ axios, process });

        // Act & Assert
        await expect(quoteService.getQuote()).rejects.toThrow('Mocked Error')
    })
});
