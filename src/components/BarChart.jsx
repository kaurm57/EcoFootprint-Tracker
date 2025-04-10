import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ userData, averageData }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear previous content.
    d3.select(ref.current).selectAll('*').remove();

    // Build data array.
    const data = [
      { category: 'Food', user: (userData.CF_Food).toFixed(2), avg: averageData.Food },
      { category: 'Transport', user: (userData.CF_Transport).toFixed(2), avg: averageData.Transport },
      { category: 'Household', user: (userData.CF_Household).toFixed(2), avg: averageData.Household },
      { category: 'Goods', user: (userData.CF_Goods).toFixed(2), avg: averageData.Goods },
    ];

    // Adjusted margins and dimensions.
    const margin = { top: 60, right: 80, bottom: 60, left: 50 }; // increased bottom margin
    const width = 300 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Create the SVG container.
    const svg = d3.select(ref.current)
      .attr('width', width + margin.left + margin.right + 100) // extra space for legend
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Custom colors.
    const userBarColor = '#c26e6e';
    const avgBarColor = '#b8dba3';

    // Set scales.
    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.user, d.avg)) * 1.2])
      .range([height, 0]);

    // Append x-axis.
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "7px");  // Adjust this value as needed.

    // Append y-axis.
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add x-axis label (pushed down to add space).
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 45)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Categories");

    // Add y-axis label.
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", - height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Emission (kg CO₂e/year)");

    // Append tooltip element.
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "rgba(255, 255, 255, 0.9)")
      .style("padding", "8px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Draw the user bars.
    svg.selectAll('.bar-user')
      .data(data)
      .join('rect')
        .attr('class', 'bar-user')
        .attr('x', d => x(d.category))
        .attr('width', x.bandwidth() / 2)
        .attr('y', d => y(d.user))
        .attr('height', d => height - y(d.user))
        .attr('fill', userBarColor)
        .on("mouseover", function(event, d) {
          tooltip.html(`<strong>${d.category}</strong><br/>User: ${d.user}`)
            .style("opacity", 1);
        })
        .on("mousemove", function(event) {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top", (event.pageY - 15) + "px");
        })
        .on("mouseout", function() {
          tooltip.style("opacity", 0);
        });

    // Draw the average bars.
    svg.selectAll('.bar-avg')
      .data(data)
      .join('rect')
        .attr('class', 'bar-avg')
        .attr('x', d => x(d.category) + x.bandwidth() / 2)
        .attr('width', x.bandwidth() / 2)
        .attr('y', d => y(d.avg))
        .attr('height', d => height - y(d.avg))
        .attr('fill', avgBarColor)
        .on("mouseover", function(event, d) {
          tooltip.html(`<strong>${d.category}</strong><br/>Average: ${d.avg}`)
            .style("opacity", 1);
        })
        .on("mousemove", function(event) {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top", (event.pageY - 15) + "px");
        })
        .on("mouseout", function() {
          tooltip.style("opacity", 0);
        });

    // Add legend (key) to indicate which color is which.
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 20}, 20)`);

    // Legend for User data.
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", userBarColor);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("User")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    // Legend for Average data.
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", avgBarColor);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 37)
      .text("Average")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    // Cleanup tooltip on unmount.
    return () => {
      tooltip.remove();
    };

  }, [userData, averageData]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
