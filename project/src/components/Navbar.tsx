import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Download } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const heroHeight = window.innerHeight; // Height of first section

    // Only show navbar in first section or when scrolling up
    if (currentScrollY > heroHeight) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
    setScrolled(currentScrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    if (isScrolling) return;

    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActive(sectionId);
      setToggle(false);

      setTimeout(() => setIsScrolling(false), 1000);
    }
  }, [isScrolling]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent"} px-6 sm:px-16 py-5`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="#home"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              if (!isScrolling) {
                setActive("");
                setIsScrolling(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => setIsScrolling(false), 1000);
              }
            }}
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
              KR
            </div>
            <p className="text-white text-[18px] font-bold cursor-pointer flex mr-8">
              Kruthik Reddy &nbsp;
              <span className="hidden lg:block">| Engineer & Cybersecurity Specialist</span>
            </p>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden sm:flex flex-row gap-10"
        >
          {navLinks.map((nav) => (
            <a
              key={nav.name}
              href={nav.href}
              className={`${
                active === nav.href.substring(1) ? "text-accent" : "text-white"
              } hover:text-accent text-[18px] font-medium cursor-pointer relative group transition-colors duration-300`}
              onClick={(e) => scrollToSection(e, nav.href.substring(1))}
            >
              {nav.name}
              <span className="h-[2px] inline-block bg-accent absolute left-0 -bottom-0.5 w-0 group-hover:w-full transition-[width] ease duration-300">
                &nbsp;
              </span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="flex items-center gap-1 text-white bg-accent px-4 py-2 rounded-full hover:bg-accent-700 transition-all duration-300"
          >
            Resume <Download className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="w-[28px] h-[28px] object-contain text-white"
            aria-label={toggle ? "Close menu" : "Open menu"}
          >
            {toggle ? <X /> : <Menu />}
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-100/95 backdrop-blur-md absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-50 rounded-xl shadow-lg border border-white/10`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.name}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.href.substring(1) ? "text-accent" : "text-white"
                  }`}
                >
                  <a 
                    href={nav.href} 
                    onClick={(e) => scrollToSection(e, nav.href.substring(1))}
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    {nav.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/My-Folio/project/public/resume.pdf"
                  className="flex items-center gap-1 text-white bg-accent px-4 py-2 rounded-full hover:bg-accent-700 transition-all duration-300"
                >
                  Resume <Download className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
