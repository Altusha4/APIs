const btn = document.getElementById('generateBtn');
const container = document.getElementById('userContainer');

btn.addEventListener('click', generateUser);

async function generateUser() {
    container.innerHTML = `
        <div class="loading">
            Loading...
        </div>
    `;

    const res = await fetch('/api/user');
    const data = await res.json();

    const { user, country, exchange, news } = data;

    let exchangeHTML = '<p><b>Exchange Rates:</b> N/A</p>';

    if (exchange && country.currencyCode) {
        exchangeHTML = `
            <h4>Exchange Rates</h4>
            <p>1 ${country.currencyCode} = ${exchange.USD.toFixed(2)} USD</p>
            <p>1 ${country.currencyCode} = ${exchange.KZT.toFixed(2)} KZT</p>
        `;
    }

    let newsHTML = '<p><i>No news available</i></p>';

    if (news && news.length > 0) {
        newsHTML = `
            <div class="news-row">
                ${news.map(n => `
                    <div class="news-card">
                        ${n.image ? `<img src="${n.image}" alt="News image">` : ''}
                        <h4>${n.title}</h4>
                        <p>${n.description}</p>
                        <a href="${n.url}" target="_blank">Read more</a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    container.innerHTML = `
        <div class="profile-layout">
            <section class="profile-header">
                <img src="${user.picture}" class="avatar">
                <div>
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <p>${user.city}, ${user.country}</p>
                </div>
            </section>

            <section class="profile-grid">

                <div class="box">
                    <h3>User Info</h3>
                    <p><b>Gender:</b> ${user.gender}</p>
                    <p><b>Age:</b> ${user.age}</p>
                    <p><b>Date of birth:</b> ${new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    <p><b>Address:</b> ${user.address}</p>
                </div>

                <div class="box">
                    <h3>Country Info</h3>
                    <p><b>Capital:</b> ${country.capital}</p>
                    <p><b>Languages:</b> ${country.languages}</p>
                    <p><b>Currency:</b> ${country.currency}</p>
                    <img src="${country.flag}" class="flag">
                    ${exchangeHTML}
                </div>
            </section>

            <section class="news-section">
                <h3>Latest News</h3>
                ${newsHTML}
            </section>
        </div>
    `;
}