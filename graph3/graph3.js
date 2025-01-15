// Data for the cities and skateparks
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

// Array of colors for each bar (soft lavender and pink tone)
const barColors = [
    '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC',
    '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4',
    '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC',
    '#FF5EC4', '#BFABCC', '#FF5EC4', '#BFABCC', '#FF5EC4'
];

// Get the context of the canvas element
const ctx = document.getElementById('skateparkChart').getContext('2d');

// Initialize the bar chart using Chart.js
new Chart(ctx, {
    type: 'bar', // Bar chart type
    data: {
        labels: cities, // Cities for the x-axis
        datasets: [{
            label: 'Number of Skateparks',
            data: skateparks, // Data for number of skateparks
            backgroundColor: barColors, // Assign each bar a color from the array
            borderColor: barColors, // Border color for bars, using the same color for consistency
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Make chart responsive
        plugins: {
            title: {
                display: true,
                text: 'Cities with The Most Skateparks in The World',
                font: {
                    size: 24,
                    weight: 'bold'
                },
                color: '#6A4E23' // Title color
            },
            legend: {
                display: false // Hide the legend
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Cities',
                    color: '#FF5EC4',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#6A4E23'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Skateparks',
                    color: '#FF5EC4',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                },
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#6A4E23'
                }
            }
        },
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30
            }
        },
        // Hover effect to increase the size of the bars slightly
        hover: {
            mode: 'nearest', // Hover over nearest element
            animationDuration: 200, // Duration of hover effect
            intersect: false, // Trigger hover effect even when not exactly on the bar
        },
        // Custom scales to adjust the hover effect (scale up the bars)
        elements: {
            bar: {
                hoverBorderWidth: 3,  // Adds a border width when hovered
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)', // Change color of the bar on hover
                hoverBorderColor: 'brown', // Border color when hovered
            }
        }
    }
});