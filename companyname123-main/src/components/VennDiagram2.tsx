import { useState } from "react";
import { ShareNetwork, Shield, Users, Lightning, Globe, Code } from "phosphor-react";

export default function VennDiagram2() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Circle properties
  const radius = 150;
  const centerDistance = 90;
  const svgWidth = 500; // Reduced width for better fit in column
  const svgHeight = 500;
  const centerX = svgWidth / 2;
  const centerY = 250;

  // Position circles in a triangle formation
  const centers = [
    { x: centerX - centerDistance, y: centerY + centerDistance / 2 },
    { x: centerX + centerDistance, y: centerY + centerDistance / 2 },
    { x: centerX, y: centerY - centerDistance },
  ];

  // Section data with telecom-specific content
  const sections = [
    {
      id: "A",
      name: "Operators",
      color: "#A6CE39",
      hoverColor: "#95bb33",
      icon: <div className="p-1"><Shield weight="thin" size={20} /></div>,
      description:
        "Offer traffic with the latest technology just focus to manage the network with minimum edge equipment to minimise the OPEX.",
    },
    {
      id: "B",
      name: "Customer",
      color: "#44C8F5",
      hoverColor: "#3ab4e0",
      icon: <div className="p-1"><Lightning weight="thin" size={20} /></div>,
      description:
        "Bullet1: Invested on the technology setup and need up and running services. Bullet2: Doesn't know the technology to invest correctly. Bullet3: Have security issue to use the new technology.",
    },
    {
      id: "C",
      name: "htc",
      color: "#7CCCBF",
      hoverColor: "#6ab8ac",
      icon: <div className="p-1"><ShareNetwork weight="thin" size={20} /></div>,
      description:
        "Deliver technology solutions that meet customer needs while generating demand for traffic from operators.",
    },
    {
      id: "ABC",
      name: "Our Core Excellence",
      color: "#fd79a8",
      hoverColor: "#e86a97",
      icon: <div className="p-1"><Globe weight="thin" size={20} /></div>,
      description: "HTC bridging the Technology and Solution gap",
    },
  ];

  // Find the active section or default to first section
  const activeSection =
    sections.find((s) => s.id === hoveredSection) || sections[0];

  // Function to format description with bullet points if needed
  const formatDescription = (description: string) => {
    if (description.includes("Bullet")) {
      const bulletPoints = description.split("Bullet");
      return (
        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/80">
          {bulletPoints
            .filter((point) => point.trim().length > 0)
            .map((point, index) => {
              const cleanPoint = point.replace(/^\d+: /, "");
              return <li key={index}>{cleanPoint}</li>;
            })}
        </ul>
      );
    }
    return <p className="text-white/80">{description}</p>;
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 max-w-6xl mx-auto">
      {/* Left Column - Venn Diagram */}
      <div className="w-full md:w-1/2">
        <div className="relative w-full rounded-lg p-4">
          <div className="text-center text-white/70 text-sm mt-2">
            Hover over a region to view details
          </div>
          <div className="w-full h-6"></div>

          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
            {/* Circles */}
            <g className="opacity-80">
              {centers.map((center, i) => (
                <circle
                  key={i}
                  cx={center.x}
                  cy={center.y}
                  r={radius}
                  fill={sections[i].color}
                  fillOpacity="0.2"
                  stroke={sections[i].color}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  style={{
                    filter:
                      hoveredSection === sections[i].id
                        ? "brightness(1.3)"
                        : "none",
                  }}
                />
              ))}
            </g>

            {/* Invisible hit areas */}
            <g>
              {sections.map((section) => {
                if (section.id.length === 1) {
                  // Single circle hit areas
                  const index = section.id.charCodeAt(0) - 65;
                  return (
                    <circle
                      key={section.id}
                      cx={centers[index].x}
                      cy={centers[index].y}
                      r={radius * 0.8}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                  );
                }
                return null;
              })}

              {/* Intersection hit areas */}
              <circle
                cx={centerX}
                cy={centerY}
                r={65}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSection("ABC")}
                onMouseLeave={() => setHoveredSection(null)}
              />

              <circle
                cx={(centers[0].x + centers[1].x) / 2}
                cy={centers[0].y + 30}
                r={30}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSection("AB")}
                onMouseLeave={() => setHoveredSection(null)}
              />

              <circle
                cx={(centers[0].x + centers[2].x) / 2 - 20}
                cy={(centers[0].y + centers[2].y) / 2 - 20}
                r={30}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSection("AC")}
                onMouseLeave={() => setHoveredSection(null)}
              />

              <circle
                cx={(centers[1].x + centers[2].x) / 2 + 20}
                cy={(centers[1].y + centers[2].y) / 2 - 20}
                r={30}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSection("BC")}
                onMouseLeave={() => setHoveredSection(null)}
              />
            </g>

            {/* Labels */}
            {sections.slice(0, 3).map((section, i) => (
              <text
                key={section.id}
                x={centers[i].x}
                y={centers[i].y}
                textAnchor="middle"
                className="fill-white text-lg font-medium"
              >
                {section.name}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Right Column - Description Panel */}
      <div className="w-full md:w-1/2">
        <div
          className="h-full p-6 rounded-lg border-l-4 transition-all duration-300 bg-gray-900/80 backdrop-blur-sm"
          style={{ borderLeftColor: activeSection.color }}
        >
          <div className="flex items-center mb-4">
            <div
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: activeSection.color }}
            >
              {activeSection.icon}
            </div>
            <div>
              <h3 className="font-bold text-2xl text-white">
                {activeSection.name}
              </h3>
              {hoveredSection === "ABC" && (
                <span className="mt-1 inline-block px-2 py-1 bg-pink-500/20 text-white/90 text-xs rounded-full">
                  Core Excellence
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            {formatDescription(activeSection.description)}
          </div>

          {!hoveredSection && (
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium text-lg text-white mb-2">
                How to use this diagram
              </h4>
              <p className="text-white/70">
                Explore the relationships between Operators, Customers, and htc
                by hovering over different regions of the Venn diagram. Each
                intersection represents a unique collaborative aspect of our
                integrated approach.
              </p>
            </div>
          )}

          {/* Additional Information Based on Selection */}
          {hoveredSection && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white/90 font-medium">Key Benefits:</h4>
              <ul className="mt-2 text-white/70 list-disc pl-5 space-y-1">
                {hoveredSection === "A" && (
                  <>
                    <li>Cost Reduction</li>
                    <li>Simplified Network Management</li>
                    <li>Enhanced Technological Performance</li>
                  </>
                )}
                {hoveredSection === "B" && (
                  <>
                    <li>Maximized Return on Investment (ROI)</li>
                    <li>Guided Technology Selection</li>
                    <li>Improved Security</li>
                  </>
                )}
                {hoveredSection === "C" && (
                  <>
                    <li>Customer-Centric Innovation</li>
                    <li>Increased Operator Revenue</li>
                    <li>Market Differentiation & Competitiveness</li>
                  </>
                )}
                {hoveredSection === "ABC" && (
                  <>
                    <li>Seamless Integration & Deploymen</li>
                    <li>Enhanced Operational Efficiency</li>
                    <li>Accelerated Innovation & Market Growth</li>
                  </>
                )}
                {/* Other sections commented out in original code */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
