import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const VennDiagram: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 600;
    const height = 400;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Define circles
    const circles = [
      { x: -50, y: 0, r: 100, label: "Innovation", color: "#44C8F5" },
      { x: 50, y: 0, r: 100, label: "Technology", color: "#7CCCBF" },
      { x: 0, y: 70, r: 100, label: "People", color: "#A6CE39" },
    ];

    // Create gradient definitions
    const defs = svg.append("defs");

    circles.forEach((circle, i) => {
      const gradient = defs
        .append("radialGradient")
        .attr("id", `gradient-${i}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", circle.color)
        .attr("stop-opacity", 0.3);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", circle.color)
        .attr("stop-opacity", 0.1);
    });

    // Draw circles
    circles.forEach((circle, i) => {
      // Circle
      svg
        .append("circle")
        .attr("cx", circle.x)
        .attr("cy", circle.y)
        .attr("r", circle.r)
        .attr("fill", `url(#gradient-${i})`)
        .attr("stroke", circle.color)
        .attr("stroke-width", 2)
        .attr("class", "transition-all duration-300 hover:stroke-opacity-100")
        .style("stroke-opacity", 0.6)
        .style("mix-blend-mode", "screen");

      // Labels
      const labelRadius = circle.r + 20;
      const labelAngle = i * ((2 * Math.PI) / 3);
      const labelX = circle.x + labelRadius * Math.cos(labelAngle);
      const labelY = circle.y + labelRadius * Math.sin(labelAngle);

      svg
        .append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("class", "text-sm font-medium")
        .text(circle.label);
    });

    // Center text
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("class", "text-lg font-bold")
      .text("Our Core");

    // Add intersection labels
    const intersectionLabels = [
      { x: 0, y: -20, text: "Digital Transformation" },
      { x: -20, y: 40, text: "Employee Growth" },
      { x: 20, y: 40, text: "Technical Excellence" },
    ];

    intersectionLabels.forEach((label) => {
      svg
        .append("text")
        .attr("x", label.x)
        .attr("y", label.y)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("class", "text-xs opacity-70")
        .text(label.text);
    });
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-center items-center p-4 overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full max-w-[600px] h-auto"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <h3 className="text-[#44C8F5] text-xl font-semibold mb-3">
            Innovation
          </h3>
          <p className="text-white/70">
            Driving the future of telecommunications through continuous
            innovation and cutting-edge solutions. We invest heavily in R&D to
            stay ahead of industry trends and create breakthrough technologies
            that shape tomorrow's connectivity landscape.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-[#7CCCBF] text-xl font-semibold mb-3">
            Technology
          </h3>
          <p className="text-white/70">
            Leveraging advanced technology to build robust, scalable
            infrastructure that powers global communications. Our technical
            expertise spans 5G networks, cloud computing, IoT, and beyond,
            ensuring reliable and future-proof solutions.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-[#A6CE39] text-xl font-semibold mb-3">People</h3>
          <p className="text-white/70">
            Putting people at the heart of everything we do. From our dedicated
            team members to the communities we serve, we believe that technology
            should enhance human connections and improve lives across the globe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VennDiagram;
