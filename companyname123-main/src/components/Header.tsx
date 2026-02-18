import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  Globe,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SubItem {
  name: string;
  disabled: boolean;
  href?: string;
}

interface NavItem {
  name: string;
  href: string; // Making href required
  id: string;
  subItems?: SubItem[];
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  // Change this ref to specifically store references to the submenu motion.div elements
  const submenuContentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navItems: NavItem[] = [
    { name: "HOME", href: "/", id: "home" },
    { name: "ABOUT US", href: "/about", id: "about" },
    {
      name: "WHAT WE DO",
      href: "/what-we-do", // Added href
      id: "what-we-do",
      subItems: [
        {
          name: "CONNECTIVITY",
          disabled: true,
          href: "/what-we-do/connectivity",
        },
        {
          name: "UNIFIED COMMUNICATION",
          disabled: true,
          href: "/what-we-do/unified-communication",
        },
        { name: "IOT", disabled: true, href: "/what-we-do/iot" },
        { name: "ACCESS", disabled: true, href: "/what-we-do/access" },
        {
          name: "COMMAND AND CONTROL",
          disabled: true,
          href: "/what-we-do/command-and-control",
        },
        {
          name: "MANAGED SERVICES",
          disabled: true,
          href: "/what-we-do/managed-services",
        },
        {
          name: "MILITARY SOLUTIONS",
          disabled: true,
          href: "/what-we-do/military-solutions",
        },
        {
          name: "DISTRIBUTION",
          disabled: true,
          href: "/what-we-do/distribution",
        },
      ],
    },
    {
      name: "SOLUTIONS",
      href: "/solutions", // Added href
      id: "solutions",
    },
    {
      name: "OUR CUSTOMERS",
      href: "/customers", // Added href
      id: "customers",
    },
    {
      name: "OUR PARTNERS",
      href: "/partners", // Added href
      id: "partners",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside of ALL currently open submenus
      const isClickOutsideAnySubmenu = Object.keys(openSubMenus).every(
        (itemId) => {
          if (openSubMenus[itemId]) {
            // Only check for open submenus
            const submenuRef = submenuContentRefs.current[itemId];
            // Also check if the click is outside the button that toggles the submenu
            const buttonRef = document.getElementById(
              `submenu-toggle-${itemId}`
            );

            return (
              submenuRef &&
              !submenuRef.contains(event.target as Node) &&
              buttonRef &&
              !buttonRef.contains(event.target as Node)
            );
          }
          return true; // If submenu is not open, it's considered "outside" for this check
        }
      );

      if (isClickOutsideAnySubmenu) {
        setOpenSubMenus({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubMenus]); // Depend on openSubMenus to re-run the effect when submenu states change

  // Effect to handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      // Store current scroll position
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  // Reset active submenu when mobile menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
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

  const submenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const toggleSubMenu = (itemId: string) => {
    setOpenSubMenus((prev) => {
      const newState = { ...prev };
      // Close all other submenus, except the one being toggled
      Object.keys(newState).forEach((key) => {
        if (key !== itemId) newState[key] = false;
      });
      // Toggle the clicked submenu
      newState[itemId] = !prev[itemId];
      return newState;
    });
  };

  const handleMobileSubmenuClick = (itemId: string) => {
    setActiveSubmenu(itemId);
  };

  const handleBackToMainMenu = () => {
    setActiveSubmenu(null);
  };

  const hasSubMenu = (item: NavItem) => {
    return item.subItems && item.subItems.length > 0;
  };

  // Handler for disabled menu items
  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Find the current submenu item for display
  const currentSubmenuItem = navItems.find((item) => item.id === activeSubmenu);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-sm bg-white/90" : "bg-white"
      }`}
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-transparent via-[#005E96] to-transparent transition-all duration-500 ${
            scrolled ? "opacity-60" : "opacity-0"
          }`}
          style={{
            width: "200%",
            animation: scrolled ? "glowLine 4s linear infinite" : "none",
            transformOrigin: "center",
          }}
        />
      </div>

      <nav className="container mx-auto px-4 sm:px-6 relative z-10 py-4">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="py-1 flex items-center justify-center w-48">
              <Logo className="text-black w-full h-full" />
            </Link>
          </motion.div>

          {/* Vertical Line Separator */}
          <div className="hidden md:block h-8 w-px bg-black/10 mx-8" />

          <div className="hidden md:flex items-center flex-1">
            <div className="relative flex space-x-1">
              {navItems.map((item, i) => (
                <div
                  key={item.name}
                  className="relative"
                  // You might still want a ref here for other purposes, but not for click outside logic
                  // ref={(el) => { submenuRefs.current[item.id] = el; }}
                >
                  {hasSubMenu(item) ? (
                    // Button with submenu - now with Link around it
                    <div className="relative">
                      <div className="flex items-center">
                        <Link
                          to={item.href}
                          className={`relative px-3 sm:px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md inline-block ${
                            location.pathname === item.href
                              ? "text-[#005E96]"
                              : "text-[#005E96]/70 hover:text-[#005E96]"
                          }`}
                          onMouseEnter={() => setHoverIndex(i)}
                          onMouseLeave={() => setHoverIndex(null)}
                        >
                          <span className="relative z-10">
                            {item.name}
                            <span
                              className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#005E96] to-[#A6CE39] transform origin-left transition-transform duration-300 ${
                                location.pathname === item.href ||
                                hoverIndex === i
                                  ? "scale-x-100"
                                  : "scale-x-0"
                              }`}
                            />
                          </span>
                        </Link>
                        <button
                          id={`submenu-toggle-${item.id}`} // Add an ID to the button
                          className={`relative py-2 px-1 text-sm font-medium transition-colors duration-300 rounded-md inline-block ${
                            openSubMenus[item.id]
                              ? "text-[#005E96]"
                              : "text-[#005E96]/70 hover:text-[#005E96]"
                          }`}
                          onMouseEnter={() => setHoverIndex(i)}
                          onMouseLeave={() => setHoverIndex(null)}
                          onClick={() => toggleSubMenu(item.id)}
                          aria-expanded={openSubMenus[item.id]}
                          aria-controls={`submenu-${item.id}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              openSubMenus[item.id] ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Submenu */}
                      <AnimatePresence>
                        {openSubMenus[item.id] && (
                          <motion.div
                            id={`submenu-${item.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-4 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200 overflow-hidden"
                            ref={(el) => {
                              submenuContentRefs.current[item.id] = el;
                            }} // Set the ref on the actual submenu div
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#005E96] to-[#A6CE39]"></div>
                            <div className="py-2">
                              {item.subItems!.map((subItem) =>
                                subItem.disabled ? (
                                  // Disabled menu item - div instead of Link
                                  <div
                                    key={subItem.name}
                                    className="block px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
                                    aria-disabled="true"
                                  >
                                    {subItem.name}
                                  </div>
                                ) : (
                                  // Regular enabled menu item
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href || "#"}
                                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-300"
                                    onClick={() => setOpenSubMenus({})}
                                  >
                                    {subItem.name}
                                  </Link>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Regular link
                    <Link
                      to={item.href}
                      className={`relative px-3 sm:px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md inline-block ${
                        location.pathname === item.href
                          ? "text-[#005E96]"
                          : "text-[#005E96]/70 hover:text-[#005E96]"
                      }`}
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      <span className="relative z-10">
                        {item.name}
                        <span
                          className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#005E96] to-[#A6CE39] transform origin-left transition-transform duration-300 ${
                            location.pathname === item.href || hoverIndex === i
                              ? "scale-x-100"
                              : "scale-x-0"
                          }`}
                        />
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="ml-auto flex items-center space-x-2">
              {/* Support */}
              <p className="hidden lg:flex px-4 py-2 text-[#005E96]/70 transition-colors duration-300 text-sm font-medium items-center">
                <Globe className="w-4 h-4 mr-2" />
                SUPPORT
              </p>

              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="hidden lg:flex px-4 py-2 text-[#005E96]/70 hover:text-[#005E96] transition-colors duration-300 text-sm font-medium items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                +1 (234) 567-890
              </a>

              {/* Contact Us Button */}
              <Link
                to="/contact"
                className="px-4 py-2 bg-transparent text-[#005E96] rounded-md text-sm font-medium flex items-center group relative overflow-hidden"
              >
                <span className="absolute inset-0 rounded-md bg-transparent" />

                <span className="absolute inset-0 rounded-md p-[1px]">
                  <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#005E96] to-[#A6CE39] opacity-40" />
                </span>

                <span className="absolute h-full w-1/3 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />

                <Mail
                  size={14}
                  className="mr-1.5 relative z-10 group-hover:text-[#005E96] transition-colors duration-300"
                />
                <span className="relative z-10 group-hover:text-[#005E96] transition-colors duration-300">
                  CONTACT US
                </span>
              </Link>
            </div>
          </div>

          <button
            className="relative z-50 md:hidden ml-auto w-12 h-12 flex items-center justify-center text-[#005E96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96] rounded-full hover:text-[#005E96] transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            onKeyDown={(e) => handleKeyPress(e, () => setIsOpen(!isOpen))}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
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
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Main Mobile Menu */}
              <motion.div
                id="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 backdrop-blur-md z-40 shadow-2xl overflow-y-auto touch-pan-y ${
                  activeSubmenu ? "pointer-events-none" : ""
                }`}
                style={{ display: activeSubmenu ? "none" : "block" }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80')] bg-cover bg-center opacity-10"></div>
                  <div className="absolute inset-0 bg-white/95"></div>
                </div>

                <div className="flex flex-col h-full pt-20 pb-6 px-6 relative z-10">
                  <nav className="flex-1">
                    <ul className="space-y-1">
                      {navItems.map((item, i) => (
                        <motion.li
                          key={item.name}
                          custom={i}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          {hasSubMenu(item) ? (
                            <div className="relative">
                              <div className="flex items-center w-full">
                                <Link
                                  to={item.href}
                                  className="group flex-1 flex items-center py-3 px-4 text-base sm:text-lg font-medium text-[#005E96]/90 hover:text-[#005E96] rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96] font-sans relative overflow-hidden"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="absolute inset-0 bg-transparent" />
                                  <span className="relative z-10">
                                    {item.name}
                                  </span>
                                </Link>
                                <button
                                  className="py-3 px-2 text-[#005E96]/90 hover:text-[#005E96] rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96]"
                                  onClick={() =>
                                    handleMobileSubmenuClick(item.id)
                                  }
                                  aria-label={`Open ${item.name} submenu`}
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Regular link for mobile
                            <Link
                              to={item.href}
                              className="group flex items-center justify-between py-3 px-4 text-base sm:text-lg font-medium text-[#005E96]/90 hover:text-[#005E96] rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96] font-sans relative overflow-hidden"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="absolute inset-0 bg-transparent" />

                              {location.pathname === item.href && (
                                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#005E96] to-[#A6CE39]" />
                              )}

                              <span className="relative z-10">{item.name}</span>
                            </Link>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="mt-6 space-y-4">
                    <a
                      href="tel:+1234567890"
                      className="flex items-center px-4 py-3 text-[#005E96]/70 hover:text-[#005E96] transition-colors duration-300"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      <span className="text-base">+1 (234) 567-890</span>
                    </a>

                    <Link
                      to="/support"
                      className="flex items-center px-4 py-3 text-[#005E96]/70 hover:text-[#005E96] transition-colors duration-300"
                    >
                      <Globe className="w-5 h-5 mr-3" />
                      <span className="text-base">Support Center</span>
                    </Link>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6"
                  >
                    <Link
                      to="/contact"
                      className="w-full py-3 px-4 bg-[#005E96] text-white rounded-lg font-medium text-base transform hover:-translate-y-0.5 transition-all font-sans flex items-center justify-center relative overflow-hidden group"
                      onClick={() => setIsOpen(false)}
                    >
                      <Mail size={18} className="mr-2" />
                      <span>Contact Us</span>
                    </Link>
                  </motion.div>

                  <div className="mt-8 text-center">
                    <Logo className="h-12 w-24 mx-auto text-[#005E96] opacity-70" />
                  </div>
                </div>
              </motion.div>

              {/* Mobile Submenu Container */}
              <AnimatePresence>
                {activeSubmenu && currentSubmenuItem && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={submenuVariants}
                    className="fixed top-0 right-0 bottom-0 w-full sm:w-80 backdrop-blur-md z-50 shadow-2xl overflow-y-auto touch-pan-y"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80')] bg-cover bg-center opacity-10"></div>
                      <div className="absolute inset-0 bg-white/95"></div>
                    </div>

                    <div className="flex flex-col h-full relative z-10">
                      {/* Submenu Header with Back Button */}
                      <div className="flex items-center px-6 py-4 border-b border-gray-200/30 bg-white/50 backdrop-blur-sm">
                        <button
                          onClick={handleBackToMainMenu}
                          className="flex items-center text-[#005E96]/90 hover:text-[#005E96] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96] rounded-lg p-2 -ml-2"
                          aria-label="Back to main menu"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          <span className="text-sm font-medium">Back</span>
                        </button>
                        <div className="flex-1 text-center">
                          <h2 className="text-lg font-semibold text-[#005E96]">
                            {currentSubmenuItem.name}
                          </h2>
                        </div>
                        <div className="w-16"></div> {/* Spacer for balance */}
                      </div>

                      {/* Parent Link */}
                      <div className="px-6 py-4 border-b border-gray-200/20">
                        <Link
                          to={currentSubmenuItem.href}
                          className="flex items-center py-3 px-4 text-base font-medium text-[#005E96] bg-gradient-to-r from-[#005E96]/10 to-[#A6CE39]/10 rounded-lg hover:from-[#005E96]/20 hover:to-[#A6CE39]/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96]"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{currentSubmenuItem.name}</span>
                        </Link>
                      </div>

                      {/* Submenu Items */}
                      <nav className="flex-1 px-6 py-4">
                        <ul className="space-y-1">
                          {currentSubmenuItem.subItems!.map(
                            (subItem, index) => (
                              <motion.li
                                key={subItem.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                {subItem.disabled ? (
                                  <div className="flex items-center py-3 px-4 text-base font-medium text-[#005E96]/40 cursor-not-allowed opacity-50 rounded-lg">
                                    <span>{subItem.name}</span>
                                    <span className="ml-auto text-xs text-[#005E96]/30">
                                      Coming Soon
                                    </span>
                                  </div>
                                ) : (
                                  <Link
                                    to={subItem.href || "#"}
                                    className="flex items-center py-3 px-4 text-base font-medium text-[#005E96]/90 hover:text-[#005E96] hover:bg-white/50 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E96] group"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="flex-1">
                                      {subItem.name}
                                    </span>
                                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                                  </Link>
                                )}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </nav>

                      {/* Submenu Footer */}
                      <div className="px-6 py-4 border-t border-gray-200/20">
                        <div className="text-center">
                          <Logo className="h-4 w-16 mx-auto text-[#005E96] opacity-70" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
