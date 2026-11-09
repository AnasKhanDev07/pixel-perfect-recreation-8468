import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Panel({ src, x, rot }: { src: string; x: number; rot: number }) {
  const tex = useLoader(THREE.TextureLoader, src);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={[x, 0, -Math.abs(x) * 0.6]} rotation={[0, rot, 0]}>
        <boxGeometry args={[1.5, 2, 0.04]} />
        <meshStandardMaterial attach="material-0" color="#c9b99a" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-1" color="#c9b99a" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-2" color="#c9b99a" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-3" color="#c9b99a" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-4" map={tex} roughness={0.6} />
        <meshStandardMaterial attach="material-5" color="#151515" />
      </mesh>
    </Float>
  );
}
function Rig({ images }: { images: string[] }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s, d) => {
    if (!g.current) return;
    const dt = Math.min(d, 0.05);
    g.current.rotation.y += (s.pointer.x * 0.35 - g.current.rotation.y) * (1 - Math.exp(-4 * dt));
    g.current.rotation.x += (-s.pointer.y * 0.12 - g.current.rotation.x) * (1 - Math.exp(-4 * dt));
  });
  return <group ref={g}>{images.map((src, i) => <Panel key={src} src={src} x={(i - (images.length - 1) / 2) * 1.8} rot={-(i - (images.length - 1) / 2) * 0.35} />)}</group>;
}
export default function Showcase3D({ images }: { images: string[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.75]} onCreated={(s) => s.gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "")}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Environment><Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} /><Lightformer intensity={1} color="#e8dcc4" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} /></Environment>
      <Suspense fallback={null}><Rig images={images} /></Suspense>
    </Canvas>
  );
}
