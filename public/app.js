const button = document.getElementById('generateBtn');
const container = document.getElementById('userContainer');

button.addEventListener('click', async () => {
    container.innerHTML = 'Loading...';

    try {
        const response = await fetch('/api/user');
        const user = await response.json();

        container.innerHTML = `
            <div class="card">
                <img src="${user.picture}" alt="Profile picture">
                <h2>${user.firstName} ${user.lastName}</h2>

                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Date of birth:</strong> ${new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>City:</strong> ${user.city}</p>
                <p><strong>Country:</strong> ${user.country}</p>
                <p><strong>Address:</strong> ${user.address}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = 'Failed to load user data';
    }
});