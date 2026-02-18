import { useState } from 'react';
import { Network, Shield, Users } from 'lucide-react';

export default function EnhancedDimensions() {
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);

  const dimensions = [
    {
      name: "htc with operator",
      description: "Our advanced telecommunications infrastructure forms the backbone of global connectivity. We deploy and maintain cutting-edge networks that power businesses and communities worldwide, ensuring reliable and high-speed communication across continents.",
      color: "bg-[#44C8F5]",
      icon: <Network className="w-8 h-8 text-white" />
    },
    {
      name: "htc with Customers",
      description: "Understand the current setup and technology, offer the solution regards less the operator technology to integrate and match the customer requirements.",
      color: "bg-[#7CCCBF]",
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      name: "htc manage service",
      description: "Provide End to End services hassle free with Single Point of contact which provide long term relation with the customer.",
      color: "bg-[#A6CE39]",
      icon: <Users className="w-8 h-8 text-white" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Horizontal layout of dimensions */}
      <div className="flex justify-between items-center mb-8">
        {dimensions.map((dim, index) => (
          <div
            key={index}
            className={`w-32 ${selectedDimension === index ? 'scale-105' : ''} transition-transform duration-300`}
          >
            <div
              className={`w-20 h-20 mx-auto rounded-full ${dim.color} flex items-center justify-center cursor-pointer shadow-lg transform transition-all duration-300 hover:shadow-xl ${
                selectedDimension === index
                  ? 'ring-4 ring-white/20 scale-110'
                  : 'hover:scale-105'
              }`}
              onClick={() => setSelectedDimension(index === selectedDimension ? null : index)}
            >
              {dim.icon}
            </div>
            <p className="text-center mt-3 font-medium text-white/90">{dim.name}</p>
          </div>
        ))}
      </div>

      {/* Central connector */}
      <div className="relative h-1 bg-white/10 rounded-full mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#44C8F5] via-[#7CCCBF] to-[#A6CE39] opacity-50" />
        {dimensions.map((dim, index) => (
          <div
            key={index}
            className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${dim.color} transition-all duration-300 ${
              selectedDimension === index ? 'scale-150' : ''
            }`}
            style={{ left: `${index * 50}%` }}
          />
        ))}
      </div>

      {/* Description Panel */}
      <div
        className={`bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 min-h-[120px] border-l-4 ${
          selectedDimension !== null
            ? dimensions[selectedDimension].color.replace('bg-', 'border-')
            : 'border-white/20'
        }`}
      >
        {selectedDimension !== null ? (
          <div className="animate-fadeIn">
            <h3 className="font-bold text-xl text-white flex items-center">
              <span className="mr-3">{dimensions[selectedDimension].icon}</span>
              {dimensions[selectedDimension].name}
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              {dimensions[selectedDimension].description}
            </p>
          </div>
        ) : (
          <p className="text-center text-white/50 py-2">Select any dimension to view details</p>
        )}
      </div>
    </div>
  );
}