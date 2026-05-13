import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Globe, Mail } from "lucide-react";
import styled from "styled-components";
import Logo from "./Logo";
import { useTranslation, useLocale } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";

// Brand Color Variables
const BRAND_COLORS = {
  primary: "#005E96",
  secondary: "#44C8F5",
  highlight: "#7CCCBF",
  cta: "#A6CE39",
  background: "#002C3D",
  white: "#FFFFFF",
  whiteOpacity: {
    "90": "rgba(255, 255, 255, 0.9)",
    "80": "rgba(255, 255, 255, 0.8)",
    "75": "rgba(255, 255, 255, 0.75)",
    "60": "rgba(255, 255, 255, 0.6)",
    "50": "rgba(255, 255, 255, 0.5)",
    "40": "rgba(255, 255, 255, 0.4)",
    "30": "rgba(255, 255, 255, 0.3)",
    "20": "rgba(255, 255, 255, 0.2)",
    "10": "rgba(255, 255, 255, 0.1)",
    "05": "rgba(255, 255, 255, 0.05)",
    "03": "rgba(255, 255, 255, 0.03)",
  },
  secondaryOpacity: {
    "20": "rgba(68, 200, 245, 0.2)",
    "10": "rgba(68, 200, 245, 0.1)",
  },
  highlightOpacity: {
    "20": "rgba(124, 204, 191, 0.2)",
    "10": "rgba(124, 204, 191, 0.1)",
  },
  ctaOpacity: {
    "10": "rgba(166, 206, 57, 0.1)",
  },
  backgroundOpacity: {
    "80": "rgba(0, 44, 61, 0.8)",
  },
  blackOpacity: {
    "37": "rgba(0, 0, 0, 0.37)",
    "20": "rgba(0, 0, 0, 0.2)",
    "15": "rgba(0, 0, 0, 0.15)",
    "10": "rgba(0, 0, 0, 0.1)",
  },
};

// Typography Variables
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
  background: ${(props) =>
    props.$scrolled ? BRAND_COLORS.white : "transparent"};
  backdrop-filter: ${(props) => (props.$scrolled ? "blur(0px)" : "none")};
  -webkit-backdrop-filter: ${(props) =>
    props.$scrolled ? "blur(0px)" : "none"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${(props) => (props.$scrolled ? "0.9375rem 0" : "0.5625rem 0")};
  box-shadow: ${(props) => (props.$scrolled ? "none" : "none")};
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  gap: 2rem;
`;

const GlowLine = styled.div<{ $scrolled: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      #a6ce39,
      #7cccbf,
      #44c8f5,
      transparent
    );
    opacity: ${(props) => (props.$scrolled ? 0 : 0.8)};
    transition: opacity 0.5s ease;
    animation: ${(props) =>
      props.$scrolled ? "none" : "glowLine 5s linear infinite"};
    transform-origin: center;
  }

  @keyframes glowLine {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

const VerticalSeparator = styled.div<{ $scrolled: boolean }>`
  display: none;
  height: 1.5rem;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${(props) =>
      props.$scrolled ? BRAND_COLORS.primary : `${BRAND_COLORS.white}80`},
    transparent
  );
  margin: 0 1.5rem;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
  justify-content: center;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const RightNavSection = styled.div`
  display: none;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;

  html[dir="rtl"] & {
    margin-left: 0;
    margin-right: auto;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const SupportLink = styled.p<{ $scrolled: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  color: ${(props) =>
    props.$scrolled ? `${BRAND_COLORS.primary}CC` : BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }

  svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }

  html[dir="rtl"] & svg {
    margin-right: 0;
    margin-left: 0.5rem;
  }
`;

const PhoneLink = styled.a<{ $scrolled: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  color: ${(props) =>
    props.$scrolled ? `${BRAND_COLORS.primary}CC` : BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.375rem;

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }

  svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }

  html[dir="rtl"] & svg {
    margin-right: 0;
    margin-left: 0.5rem;
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) =>
    !["isActive", "hovered", "$scrolled"].includes(prop),
})<{ isActive?: boolean; hovered?: boolean; $scrolled: boolean }>`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${(props) => {
    if (!props.$scrolled)
      return props.isActive ? BRAND_COLORS.secondary : BRAND_COLORS.white;
    return props.isActive
      ? BRAND_COLORS.secondary
      : `${BRAND_COLORS.primary}CC`;
  }};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  position: relative;
  padding: 0.46875rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.375rem;
  white-space: nowrap;

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    transform: translateX(-50%)
      scaleX(${(props) => (props.isActive || props.hovered ? 1 : 0)});
    width: calc(100% - 1rem);
    height: 2px;
    background: linear-gradient(
      to right,
      ${BRAND_COLORS.secondary},
      ${BRAND_COLORS.cta}
    );
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavItemButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["isActive", "hovered", "$scrolled"].includes(prop),
})<{ isActive?: boolean; hovered?: boolean; $scrolled: boolean }>`
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${(props) => {
    if (!props.$scrolled)
      return props.isActive ? BRAND_COLORS.secondary : BRAND_COLORS.white;
    return props.isActive
      ? BRAND_COLORS.secondary
      : `${BRAND_COLORS.primary}CC`;
  }};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.46875rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  border-radius: 0.375rem;
  white-space: nowrap;

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    transform: translateX(-50%)
      scaleX(${(props) => (props.isActive || props.hovered ? 1 : 0)});
    width: calc(100% - 1rem);
    height: 2px;
    background: linear-gradient(
      to right,
      ${BRAND_COLORS.secondary},
      ${BRAND_COLORS.cta}
    );
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }

  svg {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.75rem;
  background: ${BRAND_COLORS.white};
  border-radius: 0.75rem;
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
  min-width: 240px;
  z-index: 20;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  html[dir="rtl"] & {
    left: auto;
    right: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      to right,
      ${BRAND_COLORS.secondary},
      ${BRAND_COLORS.cta}
    );
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.65625rem 0.9375rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${BRAND_COLORS.primary};
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  font-weight: 500;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 1.5rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(
        to bottom,
        ${BRAND_COLORS.secondary},
        ${BRAND_COLORS.cta}
      );
    }
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.9375rem;
    padding-right: 1.5rem;

    &::before {
      left: auto;
      right: 0;
    }
  }
`;

const DropdownSubItem = styled(Link)`
  display: block;
  padding: 0.375rem 0.75rem 0.375rem 1.5rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  color: ${BRAND_COLORS.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0.8;
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["05"]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${BRAND_COLORS.secondary};
    opacity: 1;
    padding-left: 2.25rem;
  }

  html[dir="rtl"] & {
    padding: 0.375rem 1.5rem 0.375rem 0.75rem;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.75rem;
    padding-right: 2.25rem;
  }
`;

const DropdownSection = styled.div`
  padding: 0.375rem 0;
`;

const DropdownSectionTitle = styled.div`
  padding: 0.375rem 0.75rem;
  font-family: ${TYPOGRAPHY.heading};
  font-size: 0.75rem;
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  margin-bottom: 0.1875rem;
`;

const DropdownSectionTitleLink = styled(Link)`
  display: block;
  padding: 0.65625rem 0.9375rem;
  font-family: ${TYPOGRAPHY.heading};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${BRAND_COLORS.primary};
  text-decoration: none;
  opacity: 1;
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
  margin-bottom: 0.1875rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${BRAND_COLORS.secondary};
  }
`;

const NavButton = styled(Link)`
  padding: 0.46875rem 1.125rem;
  background: linear-gradient(
    135deg,
    ${BRAND_COLORS.secondary},
    ${BRAND_COLORS.cta}
  );
  color: ${BRAND_COLORS.white};
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px ${BRAND_COLORS.secondaryOpacity["20"]};
  border: none;
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${BRAND_COLORS.cta},
      ${BRAND_COLORS.secondary}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 33.333%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-12deg) translateX(-200%);
    transition: transform 0.8s ease-in-out;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${BRAND_COLORS.secondaryOpacity["20"]};

    &::before {
      opacity: 1;
    }

    &::after {
      transform: skewX(-12deg) translateX(400%);
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    margin-right: 0.5rem;
    position: relative;
    z-index: 1;
  }

  html[dir="rtl"] & svg {
    margin-right: 0;
    margin-left: 0.5rem;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const MobileMenuButton = styled.button<{ $scrolled: boolean }>`
  display: none;
  background: ${BRAND_COLORS.whiteOpacity["10"]};
  border: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
  color: ${(props) =>
    props.$scrolled ? BRAND_COLORS.primary : BRAND_COLORS.white};
  cursor: pointer;
  padding: 0.375rem;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    border-color: ${BRAND_COLORS.secondaryOpacity["20"]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1023px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* Full-width on phones, capped drawer on tablets */
  max-width: 100vw;
  background: ${BRAND_COLORS.white};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    -4px 0 24px rgba(0, 0, 0, 0.15),
    -8px 0 48px rgba(0, 0, 0, 0.1);
  z-index: 40;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 5rem 1.5rem 2rem;
  gap: 0;
  border-left: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};

  html[dir="rtl"] & {
    right: auto;
    left: 0;
    border-left: none;
    border-right: 1px solid ${BRAND_COLORS.whiteOpacity["20"]};
    box-shadow:
      4px 0 24px rgba(0, 0, 0, 0.15),
      8px 0 48px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 480px) {
    max-width: 24rem;
  }

  @media (max-width: 1023px) {
    display: flex;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${BRAND_COLORS.secondary},
      ${BRAND_COLORS.cta}
    );
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 30;
`;

const MobileNavItem = styled.div`
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};
`;

const MobileNavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>`
  display: block;
  padding: 0.65625rem 0.9375rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 1rem;
  color: ${(props) =>
    props.isActive ? BRAND_COLORS.primary : `${BRAND_COLORS.primary}E6`};
  text-decoration: none;
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  margin: 0.25rem 0;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 1.5rem;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.9375rem;
    padding-right: 1.5rem;
  }

  ${(props) =>
    props.isActive &&
    `
    background: ${BRAND_COLORS.secondaryOpacity["10"]};
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta});
      border-radius: 0 4px 4px 0;
    }

    html[dir="rtl"] &::before {
      left: auto;
      right: 0;
      border-radius: 4px 0 0 4px;
    }
  `}
`;

const MobileNavButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65625rem 0.9375rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 1rem;
  color: ${BRAND_COLORS.primary}E6;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  margin: 0.25rem 0;

  html[dir="rtl"] & {
    text-align: right;
  }

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 1.5rem;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.9375rem;
    padding-right: 1.5rem;
  }
`;

const MobileSubMenu = styled(motion.div)`
  padding-left: 1rem;
  border-bottom: 1px solid ${BRAND_COLORS.whiteOpacity["10"]};

  html[dir="rtl"] & {
    padding-left: 0;
    padding-right: 1rem;
  }
`;

const MobileSubItem = styled(Link)`
  display: block;
  padding: 0.5625rem 0.75rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  color: ${BRAND_COLORS.primary}CC;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 1.5rem;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.75rem;
    padding-right: 1.5rem;
  }
`;

const MobileSubSubItem = styled(Link)`
  display: block;
  padding: 0.375rem 0.75rem 0.375rem 1.5rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.8125rem;
  color: ${BRAND_COLORS.primary}B3;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 2.5rem;
  }

  html[dir="rtl"] & {
    padding: 0.375rem 1.5rem 0.375rem 0.75rem;
    text-align: right;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.75rem;
    padding-right: 2.5rem;
  }
`;

const MobileSubItemAnchor = styled(Link).withConfig({ shouldForwardProp: (prop) => prop !== '$hasChildren' })<{ $hasChildren?: boolean }>`
  display: block;
  padding: 0.5625rem 0.75rem;
  font-family: ${TYPOGRAPHY.body};
  font-size: 0.875rem;
  font-weight: ${({ $hasChildren }) => ($hasChildren ? 700 : 400)};
  color: ${BRAND_COLORS.primary}CC;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${BRAND_COLORS.secondary};
    padding-left: 1.5rem;
  }

  html[dir="rtl"] & {
    text-align: right;
  }

  html[dir="rtl"] &:hover {
    padding-left: 0.75rem;
    padding-right: 1.5rem;
  }
`;

interface WhiteBgNavbarProps {
  basePath?: string;
}

const WhiteBgNavbar: React.FC<WhiteBgNavbarProps> = ({ basePath }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { localePath, isRTL } = useLocale();
  const currentBasePath = basePath || "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const isMountedRef = useRef(false);

  // Derive nav items from translations
  const navItems = t.nav.items;
  const homeItem = navItems[0];
  const aboutItem = navItems[1];
  const solutionsItem = navItems[2];
  const impactItem = navItems[3];
  const contactItem = navItems[4];

  // Check if we're on the homepage
  const isHomePage =
    location.pathname === `${currentBasePath}/` ||
    location.pathname === currentBasePath;

  // Initialize scrolled state: false for homepage, true for all other pages
  const [scrolled, setScrolled] = useState(!isHomePage);

  useEffect(() => {
    // Only apply scroll logic on homepage
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: {
      x: isRTL ? "-100%" : "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <NavBar $scrolled={scrolled}>
        <NavContainer>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              to={localePath("/")}
              style={{
                padding: "0.1875rem 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(8rem, 30vw, 14rem)",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Logo
                className="w-full h-full"
                scrolled={scrolled}
                textColorOverride={
                  scrolled ? BRAND_COLORS.primary : BRAND_COLORS.white
                }
              />
            </Link>
          </motion.div>
          <VerticalSeparator $scrolled={scrolled} />
          <NavLinks>
            <NavLink
              to={localePath("/")}
              isActive={
                location.pathname === `${currentBasePath}/` ||
                location.pathname === currentBasePath
              }
              hovered={hoverIndex === 0}
              $scrolled={scrolled}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {homeItem.label}
            </NavLink>
            {/* About Us Dropdown */}
            <NavItem
              onMouseEnter={() => {
                setOpenDropdown("about");
                setHoverIndex(1);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                setHoverIndex(null);
              }}
            >
              <NavItemButton
                aria-expanded={openDropdown === "about"}
                onClick={() =>
                  setOpenDropdown(openDropdown === "about" ? null : "about")
                }
                isActive={location.pathname.startsWith(
                  `${currentBasePath}/about/overview`,
                )}
                hovered={hoverIndex === 1}
                $scrolled={scrolled}
              >
                {aboutItem.label}
                <ChevronDown size={16} />
              </NavItemButton>
              <AnimatePresence>
                {openDropdown === "about" && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {aboutItem.children?.map((child) => (
                      <DropdownSubItem
                        key={child.path}
                        to={localePath(child.path)}
                      >
                        {child.label}
                      </DropdownSubItem>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>

            {/* What We Do Dropdown */}
            <NavItem
              onMouseEnter={() => {
                setOpenDropdown("what-we-do");
                setHoverIndex(2);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                setHoverIndex(null);
              }}
            >
              <NavItemButton
                aria-expanded={openDropdown === "what-we-do"}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "what-we-do" ? null : "what-we-do",
                  )
                }
                isActive={location.pathname.startsWith(
                  `${currentBasePath}/what-we-do`,
                )}
                hovered={hoverIndex === 2}
                $scrolled={scrolled}
              >
                {solutionsItem.label}
                <ChevronDown size={16} />
              </NavItemButton>
              <AnimatePresence>
                {openDropdown === "what-we-do" && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ minWidth: "280px" }}
                  >
                    {solutionsItem.children?.map((child) => (
                      <DropdownSection key={child.path}>
                        <DropdownSectionTitleLink
                          to={localePath(child.path)}
                        >
                          {child.label}
                        </DropdownSectionTitleLink>
                        {child.anchors?.map((anchor) => (
                          <DropdownSubItem
                            key={anchor.path}
                            to={localePath(anchor.path)}
                          >
                            {anchor.label}
                          </DropdownSubItem>
                        ))}
                      </DropdownSection>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>

            {/* Our Impact Dropdown */}
            <NavItem
              onMouseEnter={() => {
                setOpenDropdown("our-impact");
                setHoverIndex(3);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                setHoverIndex(null);
              }}
            >
              <NavItemButton
                aria-expanded={openDropdown === "our-impact"}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "our-impact" ? null : "our-impact",
                  )
                }
                isActive={location.pathname.startsWith(
                  `${currentBasePath}/our-impact`,
                )}
                hovered={hoverIndex === 3}
                $scrolled={scrolled}
              >
                {impactItem.label}
                <ChevronDown size={16} />
              </NavItemButton>
              <AnimatePresence>
                {openDropdown === "our-impact" && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {impactItem.children?.map((child) => (
                      <DropdownItem key={child.path} to={localePath(child.path)}>
                        {child.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>
          </NavLinks>
          <RightNavSection>
            <LanguageSwitcher className={`text-sm font-medium ${scrolled ? 'text-[#005E96]' : 'text-white'} hover:text-[#44C8F5] transition-colors`} />
            <PhoneLink href="tel:+966114059419" $scrolled={scrolled}>
              <Phone size={16} />
              <span dir="ltr">{t.footer.contactInfo[1].text}</span>
            </PhoneLink>
            <NavButton to={localePath("/contact")}>
              <Mail size={16} />
              <span>{contactItem.label}</span>
            </NavButton>
          </RightNavSection>
          <MobileMenuButton
            $scrolled={scrolled}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </MobileMenuButton>
        </NavContainer>
      </NavBar>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <MobileNavItem>
                <MobileNavLink
                  to={localePath("/")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  isActive={
                    location.pathname === `${currentBasePath}/` ||
                    location.pathname === currentBasePath
                  }
                >
                  {homeItem.label}
                </MobileNavLink>
              </MobileNavItem>

              {/* About Us Mobile */}
              <MobileNavItem>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MobileNavLink
                    to={localePath("/about")}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={location.pathname.startsWith(
                      `${currentBasePath}/about`,
                    )}
                    style={{ flex: 1 }}
                  >
                    {aboutItem.label}
                  </MobileNavLink>
                  <button
                    onClick={() =>
                      setOpenMobileMenu(
                        openMobileMenu === "about" ? null : "about",
                      )
                    }
                    style={{
                      padding: "0.65625rem 0.9375rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: `${BRAND_COLORS.primary}E6`,
                      flexShrink: 0,
                    }}
                    aria-label="Toggle About Us submenu"
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        transform:
                          openMobileMenu === "about"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {openMobileMenu === "about" && (
                    <MobileSubMenu
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {aboutItem.children?.map((child) => (
                        <MobileSubItemAnchor
                          key={child.path}
                          to={localePath(child.path)}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </MobileSubItemAnchor>
                      ))}
                    </MobileSubMenu>
                  )}
                </AnimatePresence>
              </MobileNavItem>

              {/* What We Do Mobile */}
              <MobileNavItem>
                <MobileNavButton
                  onClick={() =>
                    setOpenMobileMenu(
                      openMobileMenu === "what-we-do" ? null : "what-we-do",
                    )
                  }
                >
                  {solutionsItem.label}
                  <ChevronDown
                    size={16}
                    style={{
                      transform:
                        openMobileMenu === "what-we-do"
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </MobileNavButton>
                <AnimatePresence>
                  {openMobileMenu === "what-we-do" && (
                    <MobileSubMenu
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {solutionsItem.children?.map((child) => (
                        <React.Fragment key={child.path}>
                          <MobileSubItemAnchor
                            to={localePath(child.path)}
                            onClick={() => setIsMobileMenuOpen(false)}
                            $hasChildren={!!(child.anchors && child.anchors.length > 0)}
                          >
                            {child.label}
                          </MobileSubItemAnchor>
                          {child.anchors?.map((anchor) => (
                            <MobileSubSubItem
                              key={anchor.path}
                              to={localePath(anchor.path)}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {anchor.label}
                            </MobileSubSubItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </MobileSubMenu>
                  )}
                </AnimatePresence>
              </MobileNavItem>

              {/* Our Impact Mobile */}
              <MobileNavItem>
                <MobileNavButton
                  onClick={() =>
                    setOpenMobileMenu(
                      openMobileMenu === "our-impact" ? null : "our-impact",
                    )
                  }
                >
                  {impactItem.label}
                  <ChevronDown
                    size={16}
                    style={{
                      transform:
                        openMobileMenu === "our-impact"
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </MobileNavButton>
                <AnimatePresence>
                  {openMobileMenu === "our-impact" && (
                    <MobileSubMenu
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {impactItem.children?.map((child) => (
                        <MobileSubItem
                          key={child.path}
                          to={localePath(child.path)}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </MobileSubItem>
                      ))}
                    </MobileSubMenu>
                  )}
                </AnimatePresence>
              </MobileNavItem>
              <MobileNavItem
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: `1px solid ${BRAND_COLORS.blackOpacity["10"]}`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.35 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {/* Language Switcher */}
                  <LanguageSwitcher className="w-full py-2.5 px-3 text-center text-sm font-medium text-[#005E96] bg-[#005E960D] border border-[#005E961A] rounded-lg" />

                  {/* Phone */}
                  <a
                    href="tel:+966114059419"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      backgroundColor: `${BRAND_COLORS.primary}0D`,
                      border: `1px solid ${BRAND_COLORS.primary}1A`,
                      color: BRAND_COLORS.primary,
                      borderRadius: "0.5rem",
                      fontFamily: TYPOGRAPHY.body,
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    <Phone size={16} />
                    <span dir="ltr">{t.footer.contactInfo[1].text}</span>
                  </a>

                  {/* Contact CTA */}
                  <Link
                    to={localePath("/contact")}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      background: `linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.cta})`,
                      color: BRAND_COLORS.white,
                      borderRadius: "0.5rem",
                      fontFamily: TYPOGRAPHY.body,
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Mail size={16} />
                    {contactItem.label}
                  </Link>
                </motion.div>
              </MobileNavItem>

              {/* Logo watermark at bottom */}
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: `1px solid ${BRAND_COLORS.blackOpacity["10"]}`,
                  textAlign: "center",
                }}
              >
                <Logo className="h-10 w-auto mx-auto opacity-40" />
              </div>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhiteBgNavbar;
