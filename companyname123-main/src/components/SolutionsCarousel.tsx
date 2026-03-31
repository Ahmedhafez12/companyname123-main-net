import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  WifiHighHigh,
  Cloud,
  ShareShareNetwork,
  DeviceMobile,
  HardDrives,
  Globe,
  Database,
  Shield,
  ArrowRight,
  ShareNetwork,
  WifiHigh,
} from "phosphor-react";
import { Link } from "react-router-dom";

interface SolutionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const solutions: SolutionItem[] = [
  {
    id: "5g-infrastructure",
    title: "Managed WiFi",
    icon: <div className="p-2"><WifiHigh weight="thin" size={20} /></div>,
    description:
      "Next-generation mobile network infrastructure for unprecedented speed and reliability.",
    image:
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=500",
  },
  {
    id: "cloud-services",
    title: "Managed Fixed Wireless Access",
    icon: <div className="p-2"><Cloud weight="thin" size={20} /></div>,
    description: "Scalable cloud solutions for modern business needs.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500",
  },
  {
    id: "iot-networks",
    title: "Managed UC",
    icon: <div className="p-2"><ShareNetwork weight="thin" size={20} /></div>,
    description:
      "Comprehensive IoT network solutions for smart cities and industries.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=500",
  },
  {
    id: "mobile-solutions",
    title: "Infrastructure",
    icon: <div className="p-2"><DeviceMobile weight="thin" size={20} /></div>,
    description:
      "Enterprise-grade mobile connectivity and management platforms.",
    image:
      "https://images.unsplash.com/photo-1603604342747-b285bb892e2f?auto=format&fit=crop&w=500",
  },
  {
    id: "data-centers",
    title: "Special MODA Solutions",
    icon: <div className="p-2"><HardDrives weight="thin" size={20} /></div>,
    description: "High-performance data center infrastructure and management.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500",
  },
  {
    id: "global-connectivity",
    title: "Remote Patient Management ( RPM )",
    icon: <div className="p-2"><Globe weight="thin" size={20} /></div>,
    description:
      "Seamless international connectivity solutions for global enterprises.",
    image:
      "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?auto=format&fit=crop&w=500",
  },
];

const SolutionsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(
    null
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Set initial selected solution
  useEffect(() => {
    setSelectedSolution(solutions[0]);
  }, []);

  // Adjust height based on viewport
  useEffect(() => {
    const adjustHeight = () => {
      if (sectionRef.current) {
        const viewportHeight = window.innerHeight;
        sectionRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;

    const newIndex = Math.max(0, Math.min(index, solutions.length - 1));
    setActiveIndex(newIndex);
    setSelectedSolution(solutions[newIndex]);
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col justify-center relative overflow-hidden py-16 md:py-0"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10 bg-transparent">
        <div className="max-w-5xl mx-auto">
          {/* Main featured solution */}
          {selectedSolution && (
            <div className="mb-12">
              <motion.div
                key={`content-${selectedSolution.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedSolution.image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#005E96]/90 to-transparent" />

                {/* Content */}
                <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
                  {/* Left: Icon and Title */}
                  <div className="md:w-1/3 text-center md:text-left">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto md:mx-0 mb-6">
                      <div className="text-cta">
                        {React.cloneElement(
                          selectedSolution.icon as React.ReactElement,
                          { size: 40 }
                        )}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl text-white font-sans mb-4">
                      {selectedSolution.title}
                    </h3>
                  </div>

                  {/* Right: Description and CTA */}
                  <div className="md:w-2/3 flex justify-end">
                    <button className="inline-flex items-center bg-[#44C8F5] text-white px-6 py-3 rounded-lg hover:bg-[#7CCCBF] transition-all duration-300 group">
                      <span>
                        <a href="/solutions" className="button">
                          Learn More
                        </a>
                      </span>
                      <div className="p-0.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight weight="thin" size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Solution selector */}
          <div className="relative">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="relative w-8 h-8 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:border-white/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous solution"
              >
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#005E96", opacity: 0.3 }}
                ></div>
                <CaretLeft size={16} className="relative z-10" />
              </button>

              <div className="flex space-x-1">
                {solutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-4 bg-white"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to solution ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={activeIndex === solutions.length - 1}
                className="relative w-8 h-8 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:border-white/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next solution"
              >
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#005E96", opacity: 0.3 }}
                ></div>
                <div className="p-0.5 relative z-10">
                  <CaretRight weight="thin" size={20} />
                </div>
              </button>
            </div>

            {/* Solution list */}
            <div
              ref={carouselRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {solutions.map((solution, index) => (
                <motion.button
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => {
                    setSelectedSolution(solution);
                    setActiveIndex(index);
                  }}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? "border-white/30"
                      : "border-white/10 hover:border-white/30"
                  } border backdrop-blur-sm group`}
                >
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: "#005E96", opacity: 0.3 }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`text-${
                        activeIndex === index ? "[#44C8F5]" : "white/70"
                      } mb-3 transition-colors duration-300`}
                    >
                      {React.cloneElement(solution.icon as React.ReactElement, {
                        size: 24,
                      })}
                    </div>
                    <p
                      className={`text-sm ${
                        activeIndex === index ? "text-white" : "text-white/70"
                      } text-left transition-colors duration-300`}
                    >
                      {solution.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsCarousel;
