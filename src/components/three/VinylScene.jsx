import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function VinylRecord() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.6;
  });
  
  return (
    <group ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Outer disc */}
      <mesh>
        <cylinderGeometry args={[2.2, 2.2, 0.06, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Grooves */}
      {[1.6, 1.4, 1.2, 1.0, 0.8].map((r, i) => (
        <mesh key={i} position={[0, 0.031, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.005, 8, 80]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Gold Reflection ring */}
      <mesh position={[0, 0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 12, 96]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.6} />
      </mesh>
      
      {/* Center label (Dark for premium look) */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.02, 48]} />
        <meshStandardMaterial color="#121212" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gold Spindle */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.12, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function VinylScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#D4AF37" intensity={2} />
      <pointLight position={[-5, -3, 4]} color="#F3E5AB" intensity={1.5} />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <VinylRecord />
      </Float>

      {/* Gold Particles */}
      <Sparkles count={80} scale={[8, 6, 4]} size={3} speed={0.4} color="#D4AF37" />
      <Sparkles count={40} scale={[10, 6, 5]} size={2} speed={0.3} color="#ffffff" />

      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}