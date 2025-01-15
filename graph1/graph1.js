const width = 800;
const height = 600;

// Données des marques et de leur chiffre d'affaires
const data = [
    { brand: "Supreme", revenue: 500 },
    { brand: "Vans", revenue: 800 },
    { brand: "Nike SB", revenue: 1200 },
    { brand: "Converse", revenue: 600 },
    { brand: "BAPE", revenue: 400 },
    { brand: "Stüssy", revenue: 550 },
    { brand: "Palace", revenue: 450 },
    { brand: "The Hundreds", revenue: 350 },
    { brand: "Hélas", revenue: 200 },
    { brand: "Santa Cruz", revenue: 300 }
];

const svg = d3.select("#tagCloud")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const maxRevenue = d3.max(data, d => d.revenue);
const minRevenue = d3.min(data, d => d.revenue);

// Échelle pour la taille des cercles en fonction du chiffre d'affaires
const radiusScale = d3.scaleSqrt()
    .domain([minRevenue, maxRevenue])
    .range([20, 100]);

// Positionner les cercles de façon aléatoire dans l'espace
const pack = d3.pack()
    .size([width, height])
    .padding(5);

const nodes = pack(d3.hierarchy({ children: data })
    .sum(d => radiusScale(d.revenue) ** 2));

// Créer un groupe pour chaque cercle
const circles = svg.selectAll(".brand-circle")
    .data(nodes.children)
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x}, ${d.y})`);

// Créer les cercles
circles.append("circle")
    .attr("class", "brand-circle")
    .attr("r", d => radiusScale(d.data.revenue))
    .style("fill", "#FF5EC4") // Couleur initiale
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
        // Animation de "pop" pour le cercle et changement de couleur
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", radiusScale(d.data.revenue) * 1.2) // Agrandit le cercle
            .style("fill", "#BFABCC") // Change la couleur
            .ease(d3.easeBounceOut);

        // Remplacer le texte par le chiffre d'affaires
        d3.select(this.parentNode).select("text")
            .text(`${d.data.revenue}M$`) // Affiche le chiffre d'affaires
            .transition()
            .duration(200)
            .style("font-size", "18px") // Agrandir le texte
            .style("font-weight", "bold");
    })
    .on("mouseout", function(event, d) {
        // Réinitialisation de la taille et de la couleur du cercle
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", radiusScale(d.data.revenue)) // Taille normale
            .style("fill", "#FF5EC4"); // Couleur initiale

        // Restaurer le nom de la marque
        d3.select(this.parentNode).select("text")
            .text(d.data.brand) // Réaffiche le nom de la marque
            .transition()
            .duration(200)
            .style("font-size", "15px") // Taille initiale du texte
            .style("font-weight", "normal");
    });

// Ajouter les labels pour chaque cercle
circles.append("text")
    .attr("class", "brand-label")
    .text(d => d.data.brand)
    .attr("dy", ".35em") // Centrer verticalement
    .style("text-anchor", "middle")
    .style("font-family", "Montserrat, sans-serif")
    .style("font-size", "15px")
    .style("fill", "#6A4E23") // Marron
    .style("pointer-events", "none"); // Désactiver les événements pour le texte
