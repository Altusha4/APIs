const express = require('express');
const router = express.Router();

const { getRandomUser } = require('../services/randomUser');
const { getCountryInfo } = require('../services/country');
const { getExchangeRates } = require('../services/exchangeRate');

router.get('/user', async (req, res) => {
    try {
        const user = await getRandomUser();
        const country = await getCountryInfo(user.country);

        let exchange = null;

        if (country.currencyCode) {
            exchange = await getExchangeRates(country.currencyCode);
        }

        res.json({
            user,
            country,
            exchange
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to load data' });
    }
});

module.exports = router;