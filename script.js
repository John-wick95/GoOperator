// Sample load data
const loads = [
    { id: 1, from: "Chicago, IL", to: "Dallas, TX", miles: 900, pay: 2700 },
    { id: 2, from: "Atlanta, GA", to: "Miami, FL", miles: 600, pay: 1800 },
    { id: 3, from: "Los Angeles, CA", to: "Phoenix, AZ", miles: 400, pay: 1400 },
    { id: 4, from: "Denver, CO", to: "Salt Lake City, UT", miles: 500, pay: 1750 },
    { id: 5, from: "New York, NY", to: "Boston, MA", miles: 200, pay: 800 },
];

// Function to calculate rate per mile
function calculateRatePerMile(pay, miles) {
    return (pay / miles).toFixed(2);
}

// Function to render load cards
function renderLoads() {
    const loadList = document.getElementById('loadList');
    loadList.innerHTML = '';

    loads.forEach(load => {
        const ratePerMile = calculateRatePerMile(load.pay, load.miles);
        const card = document.createElement('div');
        card.classList.add('load-card');
        card.innerHTML = `
            <h3>Load #${load.id}: ${load.from} to ${load.to}</h3>
            <div class="details">
                <p>Miles: <span>${load.miles}</span></p>
                <p>Pay: <span>$${load.pay}</span></p>
            </div>
            <p class="rate-per-mile">Rate per Mile: $${ratePerMile}</p>
        `;
        loadList.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderLoads);