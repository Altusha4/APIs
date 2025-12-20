const axios = require('axios');

async function getExchangeRates(baseCurrency) {
    const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`,
        { timeout: 15000 }
    );

    if (response.data.result !== 'success') {
        throw new Error('Exchange rate API error');
    }

    return {
        USD: response.data.conversion_rates.USD,
        KZT: response.data.conversion_rates.KZT
    };
}

module.exports = { getExchangeRates };