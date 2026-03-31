import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";
import styled from "styled-components";
import Logo from "./Logo";

// Brand Color Variables
const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  highlight: "#7CCCBF",
  cta: "#A6CE39",
  background: "#002C3D",
  white: "#FFFFFF",
  secondaryOpacity: {
    "20": "rgba(68, 200, 245, 0.2)",
    "10": "rgba(68, 200, 245, 0.1)",
  },
  blackOpacity: {
    "10": "rgba(0, 0, 0, 0.1)",
  },
};

const TYPOGRAPHY = {
  heading: '"Rubik", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
};

// Styled Components
const NavBar = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: transparent;
  /* Progressive blur for high-end glassmorphism */
  backdrop-filter: ${props => props.$scrolled ? "blur(12px)" : "none"};
  -webkit-backdrop-filter: ${props => props.$scrolled ? "blur(12px)" : "none"};
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  padding: ${props => props.$scrolled ? "0.75rem 0" : "1.5rem 0"};
  
  /* Subtle architectural divider that appears on scroll */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background: ${props => props.$scrolled 
      ? `linear-gradient(to right, transparent, ${BRAND_COLORS.primary}15, transparent)` 
      : "transparent"};
    transition: background 0.5s ease;
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 clamp(1rem, 2.5vw, 2.5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
  justify-content: center;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${props => props.isActive ? BRAND_COLORS.cta : BRAND_COLORS.white};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.5rem 1rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  border-radius: 0.5rem;

  &:hover {
    color: ${BRAND_COLORS.cta};
    background: ${BRAND_COLORS.secondaryOpacity["10"]};
    transform: translateY(-1px);
  }

  /* Animated Hajz Glow Underline */
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background: linear-gradient(to right, ${BRAND_COLORS.cta}, ${BRAND_COLORS.secondary});
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 2px;
    box-shadow: ${props => props.isActive ? `0 0 8px ${BRAND_COLORS.secondary}60` : "none"};
  }
`;

const NavItemButton = styled.button<{ isActive?: boolean }>`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${props => props.isActive ? BRAND_COLORS.cta : BRAND_COLORS.white};
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;
  border-radius: 0.5rem;

  &:hover {
    color: ${BRAND_COLORS.cta};
    background: ${BRAND_COLORS.secondaryOpacity["10"]};
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.3s ease;
    color: ${BRAND_COLORS.cta};
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  box-shadow: 0 20px 40px ${BRAND_COLORS.blackOpacity["10"]};
  border: 1px solid rgba(0, 94, 150, 0.08);
  min-width: 260px;
  overflow: hidden;
  z-index: 60;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.8rem 1.25rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${BRAND_COLORS.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;

  &:hover {
    background: ${BRAND_COLORS.secondaryOpacity["10"]};
    color: ${BRAND_COLORS.cta};
    padding-left: 1.75rem;
  }
`;

const DropdownSubItem = styled(Link)`
  display: block;
  padding: 0.55rem 1.25rem 0.55rem 2rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  color: ${BRAND_COLORS.primary};
  text-decoration: none;
  font-weight: 500;
  opacity: 0.9;
  transition: all 0.25s ease;

  &:hover {
    background: ${BRAND_COLORS.secondaryOpacity["10"]};
    color: ${BRAND_COLORS.cta};
    padding-left: 2.5rem;
  }
`;

const NavButton = styled(Link)`
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
  color: ${BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 0.625rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 8px 20px ${BRAND_COLORS.secondaryOpacity["20"]};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 24px ${BRAND_COLORS.secondaryOpacity["20"]};
    filter: brightness(1.05);
  }

  svg { margin-right: 0.6rem; }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: ${BRAND_COLORS.secondaryOpacity["10"]};
  border: 1px solid ${BRAND_COLORS.secondaryOpacity["20"]};
  color: ${BRAND_COLORS.white};
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (max-width: 1023px) { display: flex; }
`;

const TransparentBgNavbar: React.FC<{ basePath?: string }> = ({ basePath }) => {
  const location = useLocation();
  const currentBasePath = basePath || "";
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === `${currentBasePath}${path}`;

  return (
    <NavBar $scrolled={scrolled}>
      <NavContainer>
        {/* Logo Section */}
        <Link to={`${currentBasePath}/`} style={{ width: "13rem", display: "flex" }}>
          <Logo scrolled={false} textColorOverride={BRAND_COLORS.white} />
        </Link>

        {/* Desktop Navigation */}
        <NavLinks>
          <NavLink to={`${currentBasePath}/`} isActive={isActive("/")}>
            Home
          </NavLink>

          <div 
            onMouseEnter={() => setOpenDropdown("about")} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative" }}
          >
            <NavItemButton isActive={location.pathname.includes("about")} aria-expanded={openDropdown === "about"}>
              About Us <ChevronDown size={14} />
            </NavItemButton>
            <AnimatePresence>
              {openDropdown === "about" && (
                <DropdownMenu
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <DropdownItem to={`${currentBasePath}/about/overview`}>Overview</DropdownItem>
                  <DropdownSubItem to={`${currentBasePath}/about/overview#company-identity`}>Company Identity</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/about/overview#our-journey`}>Our Journey</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/about/overview#vision-mission`}>Vision &amp; Mission</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/about/overview#core-strengths`}>Core Strengths</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/about/overview#competitive-edge`}>Competitive Edge</DropdownSubItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </div>

          <div 
            onMouseEnter={() => setOpenDropdown("solutions")} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative" }}
          >
            <NavItemButton isActive={location.pathname.includes("solutions")} aria-expanded={openDropdown === "solutions"}>
              Solutions <ChevronDown size={14} />
            </NavItemButton>
            <AnimatePresence>
              {openDropdown === "solutions" && (
                <DropdownMenu
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                  <DropdownItem to={`${currentBasePath}/what-we-do/telecommunications`}>Telecommunications</DropdownItem>
                  <DropdownSubItem to={`${currentBasePath}/what-we-do/telecommunications#business-unit`}>Our Core Solutions</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/what-we-do/telecommunications#service-Standards`}>Service Standards</DropdownSubItem>

                  <DropdownItem to={`${currentBasePath}/what-we-do/command-control`}>Command &amp; Control</DropdownItem>
                  <DropdownSubItem to={`${currentBasePath}/what-we-do/command-control#core-solutions`}>Our Core Solutions</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/what-we-do/command-control#tech-stack`}>Technology Stack</DropdownSubItem>
                  <DropdownSubItem to={`${currentBasePath}/what-we-do/command-control#industries-served`}>Industries We Serve</DropdownSubItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </div>

          <div 
            onMouseEnter={() => setOpenDropdown("impact")} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative" }}
          >
            <NavItemButton isActive={location.pathname.includes("customers") || location.pathname.includes("partners")} aria-expanded={openDropdown === "impact"}>
              Our Impact <ChevronDown size={14} />
            </NavItemButton>
            <AnimatePresence>
              {openDropdown === "impact" && (
                <DropdownMenu
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                  <DropdownItem to={`${currentBasePath}/customers`}>Our Customers</DropdownItem>
                  <DropdownItem to={`${currentBasePath}/partners`}>Our Partners</DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </div>
        </NavLinks>

        {/* Action Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <a 
            href="tel:+1234567890" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              color: BRAND_COLORS.white, 
              textDecoration: "none", 
              fontSize: "0.8125rem", 
              fontWeight: "700",
              letterSpacing: "0.05em"
            }}
          >
            <Phone size={16} style={{ marginRight: "0.5rem", color: BRAND_COLORS.cta }} />
            SUPPORT
          </a>
          <NavButton to={`${currentBasePath}/contact`}>
            <Mail size={16} />
            <span>Contact Us</span>
          </NavButton>
          <MobileMenuButton>
            <Menu size={20} />
          </MobileMenuButton>
        </div>
      </NavContainer>
    </NavBar>
  );
};

export default TransparentBgNavbar;