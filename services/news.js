const axios = require('axios');

async function getCountryNews(countryName) {
    const response = await axios.get(
        'https://newsapi.org/v2/everything',
        {
            params: {
                q: countryName,
                language: 'en',
                pageSize: 5
            },
            headers: {
                'X-Api-Key': process.env.NEWS_API_KEY
            },
            timeout: 15000
        }
    );

    if (response.data.status !== 'ok') {
        throw new Error('News API error');
    }

    const filtered = response.data.articles.filter(
        a => a.title && a.title.toLowerCase().includes(countryName.toLowerCase())
    );

    return filtered.slice(0, 5).map(a => ({
        title: a.title,
        description: a.description || 'No description available',
        image: a.urlToImage,
        url: a.url
    }));
}

module.exports = { getCountryNews };