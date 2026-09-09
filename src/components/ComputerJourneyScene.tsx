'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function LitBox({ position = [0, 0, 0], scale = [1, 1, 1], color, emissive, intensity = 0 }: { position?: [number, number, number]; scale?: [number, number, number]; color: string; emissive?: string; intensity?: number }) {
  return <mesh position={position} scale={scale}><boxGeometry /><meshStandardMaterial color={color} emissive={emissive ?? color} emissiveIntensity={intensity} metalness={0.25} roughness={0.55} /></mesh>;
}

function VacuumComputer() {
  return <group rotation={[0, -0.28, 0]}>
    <LitBox color="#342c25" scale={[3.8, 2.3, .68]} />
    {Array.from({ length: 28 }).map((_, index) => <group key={index} position={[-1.5 + (index % 7) * .5, .76 - Math.floor(index / 7) * .52, .48]}><mesh scale={[.13, .18, .09]}><cylinderGeometry args={[1, 1, 1, 12]} /><meshStandardMaterial color="#dba76a" emissive="#ff923d" emissiveIntensity={1.5} /></mesh><mesh position={[0, .16, 0]} scale={[.1, .1, .1]}><sphereGeometry /><meshStandardMaterial color="#fff1b5" emissive="#ffaf4d" emissiveIntensity={3} /></mesh></group>)}
    {Array.from({ length: 7 }).map((_, index) => <LitBox key={index} color="#6d5142" position={[-1.45 + index * .48, -1.38, .47]} scale={[.1, .1, .07]} emissive="#f8b85f" intensity={1.1} />)}
    <LitBox color="#87674d" position={[0, -1.35, 0]} scale={[4.1, .16, .86]} />
  </group>;
}

function MainframeCircuit() {
  return <group rotation={[0, .2, 0]}>
    <LitBox color="#11372c" scale={[4.2, .18, 2.8]} />
    {Array.from({ length: 18 }).map((_, index) => <LitBox key={index} color="#1e7156" position={[-1.55 + (index % 6) * .62, .16, -.72 + Math.floor(index / 6) * .72]} scale={[.34, .05, .34]} emissive="#3dffae" intensity={index % 3 === 0 ? 2.1 : .4} />)}
    {Array.from({ length: 6 }).map((_, index) => <LitBox key={'trace-' + index} color="#53e398" position={[-1.5 + index * .6, .18, 0]} scale={[.45, .025, .04]} emissive="#54ffa7" intensity={1.7} />)}
    <group position={[0, .46, -.3]}><LitBox color="#2f3b36" scale={[1.9, .65, .25]} />{Array.from({ length: 5 }).map((_, index) => <LitBox key={index} color="#1cff9c" position={[-.65 + index * .33, .05, .27]} scale={[.1, .08, .03]} emissive="#1cff9c" intensity={2} />)}</group>
  </group>;
}

function PersonalComputer() {
  return <group rotation={[0, -.26, 0]}>
    <LitBox color="#d7c7a8" scale={[2.45, 1.8, 1.3]} />
    <LitBox color="#4bd2be" position={[0, .27, .69]} scale={[1.53, .94, .04]} emissive="#2faf9e" intensity={1.3} />
    <LitBox color="#cbb895" position={[0, -1.18, .45]} scale={[1.85, .18, .7]} />
    {Array.from({ length: 24 }).map((_, index) => <LitBox key={index} color="#655a4a" position={[-.7 + (index % 8) * .2, -1.04, .73 - Math.floor(index / 8) * .18]} scale={[.12, .04, .1]} />)}
    <LitBox color="#a49375" position={[0, -1.58, -.02]} scale={[1.1, .2, .75]} />
  </group>;
}

function LaptopNetwork() {
  return <group rotation={[0, .18, 0]}>
    <LitBox color="#b6c3d8" position={[0, -1.08, 0]} scale={[3, .12, 1.9]} />
    <group position={[0, .5, -.68]} rotation={[-.39, 0, 0]}><LitBox color="#222a43" scale={[2.4, 1.5, .12]} /><LitBox color="#77bfff" position={[0, 0, .08]} scale={[2.08, 1.18, .025]} emissive="#4f88ff" intensity={1.4} />{Array.from({ length: 6 }).map((_, index) => <LitBox key={index} color={index % 2 ? '#9bc8ff' : '#ff9c77'} position={[-1.35 + (index % 3) * .67, .47 - Math.floor(index / 3) * .53, .11]} scale={[.44, .1, .018]} emissive={index % 2 ? '#6da8ff' : '#f77964'} intensity={.7} />)}</group>
    {Array.from({ length: 10 }).map((_, index) => <mesh key={index} position={[Math.cos(index * .63) * 3.2, Math.sin(index * .63) * 1.25, -1.2 + Math.sin(index) * .6]} scale={[.055, .055, .055]}><sphereGeometry /><meshStandardMaterial color="#8ccfff" emissive="#49a4ff" emissiveIntensity={2.5} /></mesh>)}
  </group>;
}

function FuturePhone() {
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (ring.current) ring.current.rotation.y = clock.elapsedTime * .28; });
  return <group rotation={[0, -.18, 0]}>
    <LitBox color="#dce8ff" scale={[1.25, 2.55, .18]} />
    <LitBox color="#654eff" position={[0, 0, .13]} scale={[1.05, 2.26, .025]} emissive="#5a4fff" intensity={2.2} />
    <group ref={ring}>{Array.from({ length: 8 }).map((_, index) => <group key={index} position={[Math.cos(index * .785) * 2.35, Math.sin(index * .785) * 1.35, 0]}><mesh scale={[.25, .25, .09]}><octahedronGeometry /><meshStandardMaterial color={index % 2 ? '#72efff' : '#f98db0'} emissive={index % 2 ? '#40d8ff' : '#fa70a1'} emissiveIntensity={1.8} /></mesh></group>)}</group>
    <gridHelper args={[10, 12, '#3acceb', '#1c3059']} position={[0, -1.55, -1.2]} />
  </group>;
}

function Scene() {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const world = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer, camera }) => {
    const progress = THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight * 6, 1), 0, 1);
    const stage = progress * 4;
    groups.current.forEach((group, index) => {
      if (!group) return;
      const closeness = THREE.MathUtils.clamp(1 - Math.abs(stage - index) * 1.1, 0, 1);
      const scale = .001 + closeness * .999;
      group.scale.lerp(new THREE.Vector3(scale, scale, scale), .075);
      group.rotation.y = index * .18 + progress * (index % 2 ? -2.2 : 2.2);
      group.position.y = Math.sin(clock.elapsedTime * .55 + index) * .08;
    });
    if (world.current) world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, pointer.x * .08, .03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .5, .04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -.1 - pointer.y * .3, .04);
    camera.lookAt(0, 0, 0);
  });

  return <group ref={world}>
    <group ref={(node) => { groups.current[0] = node; }}><VacuumComputer /></group>
    <group ref={(node) => { groups.current[1] = node; }}><MainframeCircuit /></group>
    <group ref={(node) => { groups.current[2] = node; }}><PersonalComputer /></group>
    <group ref={(node) => { groups.current[3] = node; }}><LaptopNetwork /></group>
    <group ref={(node) => { groups.current[4] = node; }}><FuturePhone /></group>
    <Sparkles count={115} scale={[12, 7, 7]} size={1.7} speed={.18} color="#caecff" />
    <ContactShadows position={[0, -1.85, 0]} opacity={.4} scale={13} blur={2.6} far={4.2} color="#050609" />
  </group>;
}

export default function ComputerJourneyScene() {
  return <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [0, -.1, 10.4], fov: 42 }} gl={{ antialias: true, alpha: true }}><color attach="background" args={['#090a10']} /><fog attach="fog" args={['#090a10', 7.5, 16]} /><ambientLight intensity={1.15} /><pointLight position={[-4, 4, 4]} intensity={15} color="#9fdcff" distance={12} /><pointLight position={[4, 2, 4]} intensity={12} color="#ff9773" distance={10} /><Float floatIntensity={.25} rotationIntensity={.06} speed={.55}><Scene /></Float></Canvas>;
}
