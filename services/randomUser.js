const axios = require('axios');

async function getRandomUser() {
    const response = await axios.get('https://randomuser.me/api/', {
        timeout: 15000
    });

    const u = response.data.results[0];

    return {
        firstName: u.name.first,
        lastName: u.name.last,
        gender: u.gender,
        age: u.dob.age,
        dateOfBirth: u.dob.date,
        city: u.location.city,
        country: u.location.country,
        address: `${u.location.street.name} ${u.location.street.number}`,
        picture: u.picture.large
    };
}

module.exports = { getRandomUser };