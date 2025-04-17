import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

const Earth = () => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Animation for the Earth model with optimized performance
  useFrame((state) => {
    if (earthRef.current && cloudsRef.current) {
      earthRef.current.rotation.y += 0.0005; // Slower rotation
      cloudsRef.current.rotation.y += 0.0006;
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
      <pointLight intensity={1} position={[10, 10, 10]} />
      
      {/* Earth model with rotation */}
      <group scale={2.5} position={[0, 0, 0]}>
        {/* Earth sphere */}
        <mesh ref={earthRef} castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#2233aa" 
            metalness={0.4}
            roughness={0.7}
          />
        </mesh>
        
        {/* Continents approximation */}
        <group ref={earthRef}>
          <mesh position={[0, 0, 1.01]} receiveShadow>
            <sphereGeometry args={[1.01, 16, 16, 0, Math.PI * 0.4, 0, Math.PI * 0.3]} />
            <meshStandardMaterial color="#228833" />
          </mesh>
          
          <mesh position={[0.7, 0.5, 0.7]} receiveShadow>
            <sphereGeometry args={[1.01, 16, 16, 0, Math.PI * 0.3, 0, Math.PI * 0.2]} />
            <meshStandardMaterial color="#228833" />
          </mesh>
          
          <mesh position={[-0.7, -0.3, 0.7]} receiveShadow>
            <sphereGeometry args={[1.01, 16, 16, 0, Math.PI * 0.4, 0, Math.PI * 0.3]} />
            <meshStandardMaterial color="#228833" />
          </mesh>
        </group>
        
        {/* Clouds with separate rotation */}
        <mesh ref={cloudsRef} position={[0, 0, 0]} receiveShadow>
          <sphereGeometry args={[1.02, 24, 24]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent={true}
            opacity={0.3}
          />
        </mesh>
        
        {/* Atmosphere glow */}
        <mesh>
          <sphereGeometry args={[1.15, 24, 24]} />
          <meshStandardMaterial 
            color="#4444ff" 
            transparent={true}
            opacity={0.1}
          />
        </mesh>
      </group>
    </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
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

export default EarthCanvas;