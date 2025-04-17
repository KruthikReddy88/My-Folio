import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    const count = 1500; // Further reduced for better performance
    const positions = new Float32Array(count * 3);
    random.inSphere(positions, { radius: 1.2, radius0: 0.8 }); // Added inner radius for better distribution
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Smoother rotation with performance optimization
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      ref.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.15) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          toneMapped={false} // Better color reproduction
          alphaTest={0.001} // Improved transparency handling
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay stars rendering for better initial load performance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          depth: true,
          stencil: false, // Disabled for performance
          precision: "lowp" // Lower precision for better performance
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow frame rate reduction under load
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;