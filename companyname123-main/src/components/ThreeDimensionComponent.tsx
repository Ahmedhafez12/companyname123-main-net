import { useState } from 'react';

export default function EnhancedThreeDimensionsComponent() {
    const [selectedDimension, setSelectedDimension] = useState<number | null>(null);
  
  // Sample dimensions - replace with your actual topic and dimensions
  const dimensions = [
    {
      name: "Dimension 1",
      description: "This is the first dimension of your topic. You can replace this text with details specific to your topic.",
      color: "bg-blue-500",
      icon: "📊"
    },
    {
      name: "Dimension 2",
      description: "This is the second dimension of your topic. You can replace this text with details specific to your topic.",
      color: "bg-green-500",
      icon: "🔍"
    },
    {
      name: "Dimension 3",
      description: "This is the third dimension of your topic. You can replace this text with details specific to your topic.",
      color: "bg-purple-500",
      icon: "💡"
    }
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-xl shadow-sm">
      {/* Horizontal layout of dimensions */}
      <div className="flex justify-between items-center mb-8">
        {dimensions.map((dim, index) => (
          <div 
            key={index}
            className={`w-24 ${selectedDimension === index ? 'scale-105' : ''}`}
          >
            <div
              className={`w-16 h-16 mx-auto rounded-full ${dim.color} flex items-center justify-center cursor-pointer shadow-md transform transition-all duration-300 hover:shadow-lg ${selectedDimension === index ? 'ring-4 ring-opacity-50 ring-gray-300' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedDimension(index === selectedDimension ? null : index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedDimension(index === selectedDimension ? null : index);
                }
              }}
              aria-pressed={selectedDimension === index}
            >
              <span className="text-2xl">{dim.icon}</span>
            </div>
            <p className="text-center mt-2 font-medium text-sm">{dim.name}</p>
          </div>
        ))}
      </div>
      
      {/* Central connector */}
      <div className="relative h-1 bg-gray-200 rounded-full mb-8">
        {dimensions.map((dim, index) => (
          <div 
            key={index}
            className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${dim.color} transition-all duration-300 ${selectedDimension === index ? 'scale-150' : ''}`}
            style={{ left: `${index * 50}%` }}
          />
        ))}
      </div>
      
      {/* Description Panel */}
      <div className="bg-white p-5 rounded-lg shadow-sm transition-all duration-300 min-h-16 border-l-4 border-gray-300" style={{ borderLeftColor: selectedDimension !== null ? dimensions[selectedDimension].color.replace('bg-', '#').replace('blue-500', '3b82f6').replace('green-500', '10b981').replace('purple-500', '8b5cf6') : '' }}>
        {selectedDimension !== null ? (
          <div className="animate-fadeIn">
            <h3 className="font-bold text-lg flex items-center">
              <span className="mr-2">{dimensions[selectedDimension].icon}</span>
              {dimensions[selectedDimension].name}
            </h3>
            <p className="mt-2 text-gray-700">{dimensions[selectedDimension].description}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-2">Select any dimension to view details</p>
        )}
      </div>
    </div>
  );
}