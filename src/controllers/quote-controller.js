const axios = require('axios');
const { Quote, Symbol } = require('../models');
const { QuoteService } = require("../services/quote");

module.exports.getQuote = async function (req, res) {
    const quoteService = QuoteService({ axios, model: Quote, process })
    res.status(200).send(await quoteService.getQuote(req.query.symbol));
}

module.exports.getSymbols = async function (req, res) {
    const quoteService = QuoteService({ axios, model: Symbol, process })
    res.status(200).send(await quoteService.getSymbols(req.query.symbol));
}