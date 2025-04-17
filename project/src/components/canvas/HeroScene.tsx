import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleField = () => {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    random.inSphere(p, { radius: 8 });
    return p;
  }, []);

  return (
    <Points positions={points}>
      <PointMaterial
        transparent
        color="#915EFF"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const CyberSphere = () => {
  const sphereRef = useRef();
  const materialRef = useRef();
  
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 4), []);
  const emissiveMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#915EFF",
    emissive: "#915EFF",
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.1,
  }), []);

  useFrame(({ clock }) => {
    if (sphereRef.current && materialRef.current) {
      sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      sphereRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      materialRef.current.distort = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
      emissiveMaterial.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={sphereRef} scale={2} geometry={geometry} material={emissiveMaterial}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#915EFF"
          roughness={0.1}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const CyberGrid = () => {
  const gridRef = useRef();
  const gridMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#915EFF",
    transparent: true,
    opacity: 0.4,
  }), []);
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.PI / 2;
      gridRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 - 2;
      gridMaterial.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[30, 30, "#915EFF", "#915EFF"]}
        position={[0, 0, 0]}
        material={gridMaterial}
      />
      <gridHelper
        args={[30, 30, "#915EFF", "#915EFF"]}
        position={[0, 0.1, 0]}
        rotation={[0, Math.PI / 4, 0]}
        material={gridMaterial}
      />
    </group>
  );
};

const HeroScene = () => {
  return (
    <>
      <color attach="background" args={['#050816']} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      <ParticleField />
      <CyberSphere />
      <CyberGrid />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration
          offset={[0.002, 0.002]}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.05}
        />
      </EffectComposer>
    </>
  );
};

export default HeroScene;