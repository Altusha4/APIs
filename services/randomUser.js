const axios = require('axios');

async function getRandomUser() {
    const response = await axios.get('https://randomuser.me/api/');

    const user = response.data.results[0];

    return {
        firstName: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
        age: user.dob.age,
        dateOfBirth: user.dob.date,
        city: user.location.city,
        country: user.location.country,
        address: `${user.location.street.name} ${user.location.street.number}`,
        picture: user.picture.large
    };
}

module.exports = { getRandomUser };