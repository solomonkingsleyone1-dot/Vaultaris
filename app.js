// Simple market data
const markets = [
    {name: "S&P 500", price: "4,500", change: "+1.2%"},
    {name: "NASDAQ", price: "14,200", change: "+1.5%"},
    {name: "Gold", price: "$1,950", change: "+0.3%"}
];

function loadMarkets() {
    let html = '';
    markets.forEach(item => {
        html += `
        <div class="market-item">
            <strong>${item.name}</strong>
            <span>${item.price}</span>
            <span class="change">${item.change}</span>
        </div>
        `;
    });
    document.getElementById('markets').innerHTML = html;
}

// Load when ready
document.addEventListener('DOMContentLoaded', loadMarkets);
