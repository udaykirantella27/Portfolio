'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { pcbFragmentShader, pcbVertexShader } from './shaders/pcbShader';

const PcbShaderMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2(0.5, 0.5) },
  pcbVertexShader,
  pcbFragmentShader,
);
extend({ PcbShaderMaterial });

function PcbPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { pointer } = useThree();

  useFrame((state) => {
    if (!material.current) return;
    mouse.current.lerp(new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2), 0.04);
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uMouse.value = mouse.current;
  });

  return <mesh scale={[16, 10, 1]}><planeGeometry args={[1, 1]} /><primitive ref={material} object={new PcbShaderMaterial()} attach="material" /></mesh>;
}

export default function PCBShaderBackground() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 760px) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  if (!enabled) return <div className="pcb-fallback" aria-hidden="true" />;
  return <Canvas aria-hidden="true" camera={{ position: [0, 0, 1], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: false }}><PcbPlane /></Canvas>;
}
