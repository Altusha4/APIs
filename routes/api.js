const express = require('express');
const router = express.Router();

const { getRandomUser } = require('../services/randomUser');
const { getCountryInfo } = require('../services/country');
const { getExchangeRates } = require('../services/exchangeRate');
const { getCountryNews } = require('../services/news');

router.get('/user', async (req, res) => {
    try {
        const user = await getRandomUser();

        const country = await getCountryInfo(user.country);

        let exchange = null;
        if (country.currencyCode) {
            try {
                exchange = await getExchangeRates(country.currencyCode);
            } catch (err) {
                console.error('Exchange Rate API error:', err.message);
            }
        }

        let news = [];
        try {
            news = await getCountryNews(user.country);
        } catch (err) {
            console.error('News API error:', err.message);
        }

        res.json({
            user,
            country,
            exchange,
            news
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: 'Failed to load user data'
        });
    }
});

module.exports = router;