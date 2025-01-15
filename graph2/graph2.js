// Dimensions du graphique
const width = 700;
const height = 700;
const radius = Math.min(width, height) / 2 - 90;

// Conteneur SVG
const svg = d3
  .select("#donutChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`); // Centre du graphique

// Données des collaborations de marques
const data = [
  { brands: "Supreme + Louis Vuitton", value: 50 },
  { brands: "Vans + Fear of God", value: 10 },
  { brands: "Converse + Comme des Garçons", value: 20 },
  { brands: "Nike SB + Off-White", value: 30 },
  { brands: "BAPE + Dragon Ball Z", value: 15 },
  { brands: "Stüssy + Dior", value: 25 },
  { brands: "Palace + Polo Ralph Lauren", value: 10 },
  { brands: "The Hundreds + Mike Giant", value: 5 },
  { brands: "Hélas + Adidas", value: 2 },
  { brands: "Santa Cruz + The Simpsons", value: 12 }, // Collaboration ajoutée
];

// Définir les couleurs pour les arcs
const colors = d3.scaleOrdinal([
  "#ff5ec4", // Couleur 1
  "#BFABCC", // Couleur 2
]);

// Couleur plus foncée pour les noms des marques et le titre
const brandTitleColor = "#B14D4F"; // Teinte plus foncée de C18 M73 Y63 K20 en hexadécimal

// Générateurs de pie et d'arc
const pie = d3.pie().value((d) => d.value).sort(null);
const arc = d3.arc().innerRadius(radius - 130).outerRadius(radius);

// Ajouter les arcs
const arcs = svg
  .selectAll("g")
  .data(pie(data))
  .enter()
  .append("g");

// Ajouter les segments du graphique sans outline
arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => colors(i))
  .on("mouseover", function (event, d) {
    d3.select(this).transition().duration(300).attr("transform", "scale(1.1)");

    // Changer la couleur du segment au survol
    d3.select(this).style("fill", d3.color(colors(d.index)).darker(1));

    // Afficher le nom de la marque avec un texte en haut
    const text = svg
      .append("text")
      .attr("id", "brandName")
      .attr("x", 0)
      .attr("y", -radius - 40)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", brandTitleColor)
      .style("font-weight", "bold")
      .style("font-family", "Montserrat")
      .text(d.data.brands);

    // Afficher la valeur simplifiée
    svg
      .append("text")
      .attr("class", "value-label")
      .attr("text-anchor", "middle")
      .attr("id", "valueText")
      .text(`${d.data.value}M$`)  // Simplification avec M$ pour millions de dollars
      .style("fill", d3.color(colors(d.index)).darker(1.5))
      .style("font-family", "Montserrat")
      .style("font-weight", "bold")
      .style("font-size", "30px");

    // Faire disparaître le titre
    d3.select(".title").style("display", "none");
  })
  .on("mouseout", function (event, d) {
    d3.select(this).transition().duration(300).attr("transform", "scale(1)");

    // Réinitialiser la couleur du segment
    d3.select(this).style("fill", colors(d.index));

    // Supprimer le nom de la marque et la valeur
    d3.select("#brandName").remove();
    d3.select("#valueText").remove();

    // Réafficher le titre
    d3.select(".title").style("display", null);
  });

// Ajouter le titre au centre avec la couleur plus foncée
svg
  .append("text")
  .attr("class", "title")
  .attr("text-anchor", "middle")
  .text("Collaborations")
  .style("fill", brandTitleColor) // Applique la couleur plus foncée
  .append("tspan")
  .attr("x", 0)
  .attr("dy", "1.5em")
  .text("Marques de Skate")
  .style("fill", brandTitleColor); // Applique la couleur plus foncée

// Ajouter des chemins curvilignes pour les labels
const labelRadius = radius + 40; // Augmenter le rayon pour placer les labels plus loin
arcs
  .append("path")
  .attr("class", "label-path")
  .attr("id", (d, i) => `arcLabel-${i}`)
  .attr("d", (d) =>
    d3.arc().innerRadius(labelRadius).outerRadius(labelRadius)(d)
  )
  .style("fill", "none")
  .style("pointer-events", "none"); // Rendre le chemin invisible

// Ajouter les labels curvilignes à l'extérieur avec la couleur plus foncée
arcs
  .append("text")
  .attr("class", "brand-label")
  .attr("id", (d, i) => `brandLabel-${i}`) // Ajout d'un ID unique pour chaque label
  .attr("dy", -5) // Ajuster la position verticale
  .append("textPath")
  .attr("xlink:href", (d, i) => `#arcLabel-${i}`)
  .attr("startOffset", "50%") // Centrer le texte
  .style("text-anchor", "middle")
  .style("fill", brandTitleColor) // Applique la couleur plus foncée
  .style("font-size", "16px") // Ajuster la taille de la police si nécessaire
  .style("font-family", "Montserrat") // Appliquer la police Montserrat
  .text((d) => d.data.brands)
  .style("opacity", 0) // Initialement invisible
  .style("transition", "opacity 0.3s ease"); // Transition fluide pour l'apparition des labels
