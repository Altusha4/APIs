const btn = document.getElementById('generateBtn');
const container = document.getElementById('userContainer');

btn.addEventListener('click', generateUser);

async function generateUser() {
    container.innerHTML = 'Loading...';

    const res = await fetch('/api/user');
    const data = await res.json();

    const { user, country, exchange } = data;

    // ---------- Exchange HTML ----------
    let exchangeHTML = '<p><b>Exchange Rates:</b> N/A</p>';

    if (exchange && country.currencyCode) {
        exchangeHTML = `
            <h3>Exchange Rates</h3>
            <p>1 ${country.currencyCode} = ${exchange.USD.toFixed(2)} USD</p>
            <p>1 ${country.currencyCode} = ${exchange.KZT.toFixed(2)} KZT</p>
        `;
    }

    container.innerHTML = `
        <div class="card">
            <img src="${user.picture}" alt="User photo">
            <h2>${user.firstName} ${user.lastName}</h2>

            <p><b>Gender:</b> ${user.gender}</p>
            <p><b>Age:</b> ${user.age}</p>
            <p><b>Date of birth:</b> ${new Date(user.dateOfBirth).toLocaleDateString()}</p>
            <p><b>City:</b> ${user.city}</p>
            <p><b>Country:</b> ${user.country}</p>
            <p><b>Address:</b> ${user.address}</p>

            ${
        country
            ? `
                        <hr>
                        <h3>Country Info</h3>
                        <p><b>Capital:</b> ${country.capital}</p>
                        <p><b>Languages:</b> ${country.languages}</p>
                        <p><b>Currency:</b> ${country.currency}</p>
                        <img src="${country.flag}" width="120"><br><br>

                        ${exchangeHTML}
                      `
            : `<p><i>Country data temporarily unavailable</i></p>`
    }
        </div>
    `;
}