import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Map category names to their hexadecimal colors extracted from your Tailwind classes.
const categoryColors = {
  "Food": "#e7a955",
  "Transport": "#c26e6e",
  "Household": "#b8dba3",
  "Goods": "#cf7553"
};

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear any previous contents in the SVG.
    d3.select(ref.current).selectAll('*').remove();

    // Define chart dimensions.
    const width = 250;
    const height = 250;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    // Append a group element to center the pie chart.
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Convert the data object into an array of objects { key, value }.
    const dataEntries = Object.entries(data).map(([key, value]) => ({ key, value }));
    const total = d3.sum(dataEntries, d => d.value);

    // Create the pie layout.
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(dataEntries);

    // Build the color scale using categoryColors.
    // It maps each category name to its corresponding hex color.
    const color = d3.scaleOrdinal()
      .domain(dataEntries.map(d => d.key))
      .range(dataEntries.map(d => categoryColors[d.key]));

    // Create an arc generator.
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Append a tooltip div to the body.
    // This div is positioned absolutely and hidden by default.
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "rgba(255, 255, 255, 0.9)")
      .style("padding", "8px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Build the pie slices.
    svg.selectAll('path')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.data.key))
      .attr('stroke', '#fff')
      .style('stroke-width', '2px')
      .on("mouseover", function(event, d) {
          // Calculate the percentage of this slice.
          const percent = ((d.data.value / total) * 100).toFixed(1);
          // Show the tooltip with the category name and percentage.
          tooltip.html(`<strong>${d.data.key}</strong><br/>${percent}%`)
            .style("opacity", 1);
      })
      .on("mousemove", function(event) {
          // Update the tooltip's position (10px offset from the cursor).
          tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 15) + "px");
      })
      .on("mouseout", function() {
          // Hide the tooltip when not hovering.
          tooltip.style("opacity", 0);
      });

    // Clean up the tooltip when the component unmounts.
    return () => {
      tooltip.remove();
    };

  }, [data]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
