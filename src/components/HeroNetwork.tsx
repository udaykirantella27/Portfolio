'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const nodes: [number, number, number][] = [
  [-2.7, 0.8, 0.2], [-2.2, -1.2, -0.3], [-1.35, 1.6, -0.6], [-0.8, 0.1, 0.8],
  [-0.2, -1.55, 0.1], [0.25, 1.15, -0.3], [0.85, -0.45, 0.9], [1.35, 1.6, 0.1],
  [1.75, -1.1, -0.6], [2.45, 0.6, 0.35], [0.1, 0.15, -1.1], [-1.7, -0.3, -1.15],
];
const links: [number, number][] = [[0, 2], [0, 3], [0, 11], [1, 3], [1, 4], [1, 11], [2, 3], [2, 5], [3, 4], [3, 5], [3, 10], [4, 6], [4, 10], [5, 6], [5, 7], [5, 10], [6, 8], [6, 9], [6, 10], [7, 9], [8, 9], [10, 11]];

function NetworkMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.18, 0.03);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, state.pointer.x * 0.1, 0.03);
  });
  return (
    <group ref={group} rotation={[0.25, -0.4, 0]}>
      {links.map(([from, to]) => <Line key={from + '-' + to} points={[nodes[from], nodes[to]]} color="#56c7ff" transparent opacity={0.26} lineWidth={0.55} />)}
      {nodes.map((position, index) => <mesh key={index} position={position}><sphereGeometry args={[index % 4 === 0 ? 0.075 : 0.045, 16, 16]} /><meshBasicMaterial color={index % 3 === 0 ? '#73f4dc' : '#a78bfa'} transparent opacity={0.95} /></mesh>)}
    </group>
  );
}

export default function HeroNetwork() {
  return <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><ambientLight intensity={0.8} /><NetworkMesh /></Canvas>;
}
