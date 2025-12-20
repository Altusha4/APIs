const axios = require('axios');

async function getCountryInfo(countryName) {
    const response = await axios.get(
        'https://api.api-ninjas.com/v1/country',
        {
            params: { name: countryName },
            headers: {
                'X-Api-Key': process.env.COUNTRY_API_KEY
            },
            timeout: 15000
        }
    );

    if (!response.data || response.data.length === 0) {
        throw new Error('Country not found');
    }

    const c = response.data[0];

    let languages = 'N/A';

    if (Array.isArray(c.languages) && c.languages.length > 0) {
        languages = c.languages.map(l => l.name || l).join(', ');
    } else if (typeof c.languages === 'object' && c.languages !== null) {
        languages = Object.values(c.languages).join(', ');
    } else if (typeof c.languages === 'string') {
        languages = c.languages;
    } else if (typeof c.language === 'string') {
        languages = c.language;
    }

    if (languages === 'N/A') {
        try {
            const rc = await axios.get(
                `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
            );

            const rcCountry = rc.data[0];
            if (rcCountry.languages) {
                languages = Object.values(rcCountry.languages).join(', ');
            }
        } catch (_) {
        }
    }

    let currency = 'N/A';
    if (c.currency?.code && c.currency?.name) {
        currency = `${c.currency.code} (${c.currency.name})`;
    }

    let flag = c.flag || '';
    if (!flag && c.iso2) {
        flag = `https://flagcdn.com/w320/${c.iso2.toLowerCase()}.png`;
    }

    return {
        name: c.name,
        capital: c.capital || 'N/A',
        languages,
        currency,
        flag
    };
}

module.exports = { getCountryInfo };