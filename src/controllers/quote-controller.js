const axios = require('axios');
const model = require('../models/quote');
const { QuoteService } = require("../services/quote");

module.exports.getQuotes = async function (req, res) {
    const quoteService = QuoteService({ axios, model, process})
    res.status(200).send(await quoteService.getQuote(req.query.symbol));
}