const express = require('express');
const router = express.Router();

const { getRandomUser } = require('../services/randomUser');
const { getCountryInfo } = require('../services/country');

router.get('/user', async (req, res) => {
    try {
        const user = await getRandomUser();

        let country = null;
        try {
            country = await getCountryInfo(user.country);
        } catch (err) {
            console.error('Country API error:', err.message);
        }

        res.json({
            user,
            country
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load user or country data' });
    }
});

module.exports = router;