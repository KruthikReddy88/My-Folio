import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

const Computers = ({ isMobile }) => {
  const groupRef = useRef();
  
  // Animation for the computer model with optimized performance
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Simple computer model representation with animation */}
      <group ref={groupRef} position={[0, -3.25, -1.5]} scale={isMobile ? 0.5 : 0.75}>
        {/* Monitor */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 1, 0.11]} receiveShadow>
          <boxGeometry args={[2.8, 1.8, 0.01]} />
          <meshStandardMaterial 
            color="#1E1E1E" 
            emissive="#3E3E3E" 
            emissiveIntensity={0.5} 
          />
        </mesh>
        
        {/* Stand */}
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, -1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.2, 1]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Keyboard */}
        <mesh position={[0, -1.2, 1]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.2, 1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Mouse */}
        <mesh position={[2, -1.2, 1]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.1, 0.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Code on screen - represented as a simple plane with emissive material */}
        <mesh position={[0, 1, 0.12]} receiveShadow>
          <planeGeometry args={[2.6, 1.6]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            emissive="#4a5568" 
            emissiveIntensity={0.8} 
          />
        </mesh>
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ height: '100%', width: '100%' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

const CanvasLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="canvas-loader"></div>
    </div>
  );
};

export default ComputersCanvas;