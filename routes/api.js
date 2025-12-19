const express = require('express');
const router = express.Router();

const { getRandomUser } = require('../services/randomUser');

router.get('/user', async (req, res) => {
    try {
        const user = await getRandomUser();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

module.exports = router;