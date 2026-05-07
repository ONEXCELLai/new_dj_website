import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";

function Speaker({ position = [0, 0, 0], color = "#D4AF37" }) {
  const cone = useRef();
  useFrame((state) => {
    if (cone.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.04;
      cone.current.scale.set(s, s, s);
    }
  });
  
  return (
    <group position={position}>
      {/* Cabinet */}
      <mesh>
        <boxGeometry args={[1.6, 2.4, 1.2]} />
        {/* Darker premium look for the speaker box */}
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Driver large - BUG FIXED: rotation moved to mesh */}
      <group ref={cone} position={[0, -0.35, 0.62]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      </group>
      
      {/* Tweeter - BUG FIXED: rotation moved to mesh */}
      <mesh position={[0, 0.7, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export default function SpeakerScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} color="#D4AF37" intensity={2} />
      <pointLight position={[-3, -3, 3]} color="#F3E5AB" intensity={1.5} />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <Speaker position={[-2.2, 0, 0]} color="#D4AF37" />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Speaker position={[2.2, 0, 0]} color="#F3E5AB" />
      </Float>

      <Sparkles count={60} scale={[10, 5, 4]} size={2} color="#D4AF37" />
    </Canvas>
  );
}