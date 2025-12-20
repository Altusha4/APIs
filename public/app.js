const btn = document.getElementById('generateBtn');
const container = document.getElementById('userContainer');

btn.addEventListener('click', generateUser);

async function generateUser() {
    container.innerHTML = `
        <div class="loading">
            Loading user data...
        </div>
    `;

    try {
        const res = await fetch('/api/user');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const { user, country, exchange, news } = data;

        let exchangeHTML = '<div class="exchange-rates"><h4>Exchange Rates</h4><p>Currency data not available</p></div>';

        if (exchange && country.currencyCode) {
            exchangeHTML = `
                <div class="exchange-rates">
                    <h4>Exchange Rates (1 ${country.currencyCode})</h4>
                    <div class="rate-item">
                        <span>USD</span>
                        <span class="rate-value">${exchange.USD.toFixed(2)}</span>
                    </div>
                    <div class="rate-item">
                        <span>KZT</span>
                        <span class="rate-value">${exchange.KZT.toFixed(2)}</span>
                    </div>
                </div>
            `;
        }

        let newsHTML = '<div class="no-news"><p>No news available for this country at the moment</p></div>';

        if (news && news.length > 0) {
            newsHTML = `
                <div class="news-row">
                    ${news.map(n => `
                        <div class="news-card">
                            ${n.image ? `<img src="${n.image}" alt="${n.title}" onerror="this.style.display='none'">` : ''}
                            <h4>${n.title}</h4>
                            <p>${n.description}</p>
                            <a href="${n.url}" target="_blank" rel="noopener noreferrer">Read more →</a>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="profile-layout">
                <section class="profile-header">
                    <img src="${user.picture}" class="avatar" alt="${user.firstName} ${user.lastName}">
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
                        <div class="flag-container">
                            <img src="${country.flag}" class="flag" alt="Flag of ${country.name}">
                        </div>
                        ${exchangeHTML}
                    </div>
                </section>

                <section class="news-section">
                    <h3>Latest News</h3>
                    ${newsHTML}
                </section>
            </div>
        `;

    } catch (error) {
        console.error('Error generating user:', error);
        container.innerHTML = `
            <div class="error-message">
                <h3>Error loading data</h3>
                <p>${error.message}</p>
                <button onclick="generateUser()">Try Again</button>
            </div>
        `;
    }
}