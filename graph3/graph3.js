(() => {
    const cities = [
        "Los Angeles", "San Francisco", "São Paulo", "Melbourne", "Paris",
        "London", "Berlin", "Copenhagen", "Portland", "Sydney",
        "New York City", "Toronto", "Tokyo", "Vancouver", "Madrid",
        "Bristol", "Oslo", "Edinburgh", "Athens", "Barcelona"
    ];

    const skateparks = [
        60, 40, 30, 30, 25, 
        24, 20, 20, 20, 18, 
        15, 15, 15, 13, 13, 
        12, 12, 10, 10, 10
    ];

    const barColors = [
        '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC',
        '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4',
        '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC',
        '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4'
    ];

    const ctx = document.getElementById('skateparkChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cities,
            datasets: [{
                label: 'Number of Skateparks',
                data: skateparks,
                backgroundColor: barColors,
                borderColor: barColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Cities with The Most Skateparks in The World',
                    font: { size: 24, weight: 'bold' },
                    color: '#6A4E23'
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Cities',
                        color: '#FF5EC4',
                        font: { size: 18, weight: 'bold' }
                    },
                    ticks: { font: { size: 14, weight: 'bold' }, color: '#6A4E23' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Skateparks',
                        color: '#FF5EC4',
                        font: { size: 18, weight: 'bold' }
                    },
                    ticks: { beginAtZero: true, font: { size: 14, weight: 'bold' }, color: '#6A4E23' }
                }
            }
        }
    });
})();
