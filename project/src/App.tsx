import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis'; // Updated import
import { Navbar, Hero, About, Skills, Certificates, Experience, Projects, Contact } from './components';
import { StarsCanvas } from './components/canvas';

const App = () => {
  // Custom cursor refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Initialize smooth scroll with optimized settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);
  
  // Custom cursor effect with optimized performance
  useEffect(() => {
    if (isMobile) return; // Skip cursor effects on mobile
    
    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let outlineX = -100;
    let outlineY = -100;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseDown = () => {
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(0.9)';
      }
    };
    
    const handleMouseUp = () => {
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };
    
    const handleMouseEnterInteractive = () => {
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutlineRef.current.style.borderColor = 'rgba(145, 94, 255, 0.8)';
        cursorOutlineRef.current.style.backgroundColor = 'rgba(145, 94, 255, 0.1)';
      }
    };
    
    const handleMouseLeaveInteractive = () => {
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutlineRef.current.style.borderColor = 'rgba(145, 94, 255, 0.5)';
        cursorOutlineRef.current.style.backgroundColor = 'transparent';
      }
    };
    
    // Optimized animation frame for cursor movement
    const animateCursor = () => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        // Smooth dot movement with lerp
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        
        // Smoother outline movement with different lerp value
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        cursorOutlineRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(animateCursor);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });
    
    // Start animation loop
    requestAnimationFrame(animateCursor);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  return (
    <div className="relative z-0 bg-primary">
      {/* Custom cursor elements */}
      {!isMobile && (
        <>
          <div ref={cursorDotRef} className="cursor-dot"></div>
          <div ref={cursorOutlineRef} className="cursor-outline"></div>
        </>
      )}
      
      <div className="relative z-0">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center absolute inset-0 opacity-10 z-[-2]"></div>
        <Navbar />
        <Hero />
      </div>
      
      <About />
      <Skills />
      <Certificates />
      <Experience />
      <div className="relative z-0">
        <Projects />
        <StarsCanvas />
      </div>
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}

export default App;