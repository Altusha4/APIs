const axios = require('axios');

async function getExchangeRates(baseCurrency) {
    const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`,
        { timeout: 15000 }
    );

    if (response.data.result !== 'success') {
        throw new Error('Exchange rate API error');
    }

    const rates = response.data.conversion_rates;

    return {
        USD: rates.USD,
        KZT: rates.KZT
    };
}

module.exports = { getExchangeRates };