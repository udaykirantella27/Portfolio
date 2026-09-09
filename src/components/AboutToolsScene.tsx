'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Gear({ position, size, speed }: { position: [number, number, number]; size: number; speed: number }) {
  const gear = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (gear.current) gear.current.rotation.z += delta * speed; });
  return <group ref={gear} position={position} scale={size}>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.48, .48, .12, 24]} /><meshStandardMaterial color="#7d7469" metalness={.4} roughness={.38} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.25, .075, 10, 24]} /><meshStandardMaterial color="#f4eee2" metalness={.15} roughness={.45} /></mesh>
    {Array.from({ length: 10 }).map((_, index) => <mesh key={index} rotation={[0, 0, index * Math.PI / 5]} position={[Math.cos(index * Math.PI / 5) * .58, Math.sin(index * Math.PI / 5) * .58, 0]}><boxGeometry args={[.24, .17, .13]} /><meshStandardMaterial color="#8c8277" metalness={.32} roughness={.43} /></mesh>)}
  </group>;
}

function MiniWorkspace() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * .16, .035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * .08, .035);
    group.current.position.y = Math.sin(clock.elapsedTime * .7) * .07;
  });
  return <group ref={group} position={[.4, -.25, 0]} rotation={[-.15, -.25, 0]}>
    <mesh position={[0, -.65, 0]} scale={[2.25, .08, 1.3]}><boxGeometry /><meshStandardMaterial color="#c9bca9" metalness={.12} roughness={.58} /></mesh>
    <group position={[0, .48, -.35]} rotation={[-.3, 0, 0]}><mesh scale={[1.68, 1.05, .08]}><boxGeometry /><meshStandardMaterial color="#2e3443" metalness={.32} roughness={.32} /></mesh><mesh position={[0, 0, .06]} scale={[1.45, .82, .018]}><boxGeometry /><meshStandardMaterial color="#8bd7e4" emissive="#5bb5d0" emissiveIntensity={.6} /></mesh></group>
    <mesh position={[0, -.4, .48]} scale={[1.32, .035, .45]}><boxGeometry /><meshStandardMaterial color="#e9dfcf" roughness={.54} /></mesh>
    {Array.from({ length: 12 }).map((_, index) => <mesh key={index} position={[-.52 + (index % 6) * .21, -.355, .63 - Math.floor(index / 6) * .19]} scale={[.15, .025, .11]}><boxGeometry /><meshStandardMaterial color="#68645e" roughness={.5} /></mesh>)}
  </group>;
}

function Scene() {
  return <>
    <ambientLight intensity={1.7} />
    <directionalLight position={[3, 4, 4]} intensity={2.8} color="#fff1d7" />
    <pointLight position={[-3, 1, 3]} intensity={2.4} color="#86ebc8" />
    <MiniWorkspace />
    <Gear position={[-2.25, 1.15, -.4]} size={.74} speed={.32} />
    <Gear position={[2.25, .85, -.2]} size={.52} speed={-.48} />
  </>;
}

export default function AboutToolsScene() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 860px) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  if (!enabled) return null;
  return <Canvas camera={{ position: [0, .15, 6], fov: 42 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true }}><Scene /></Canvas>;
}
