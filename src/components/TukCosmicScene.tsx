'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Create a high-quality circular starlight point texture with soft glow falloff
function createStarTexture(): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.18, 'rgba(240, 252, 255, 0.95)');
    gradient.addColorStop(0.45, 'rgba(134, 235, 200, 0.6)');
    gradient.addColorStop(0.72, 'rgba(141, 212, 255, 0.18)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate tight, razor-sharp 3D "TUK" constellation with optical kerning
function generateTukParticles() {
  if (typeof document === 'undefined') {
    return {
      positions: new Float32Array(0),
      colors: new Float32Array(0),
      sizes: new Float32Array(0),
    };
  }

  const w = 600;
  const h = 240;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      positions: new Float32Array(0),
      colors: new Float32Array(0),
      sizes: new Float32Array(0),
    };
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  // Graceful cursive typography (Lucida Handwriting, Lucida Calligraphy, Segoe Script, cursive)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 120px "Lucida Handwriting", "Lucida Calligraphy", "Segoe Script", "Brush Script MT", "Snell Roundhand", cursive';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TUK', w / 2, h / 2);

  const imgData = ctx.getImageData(0, 0, w, h).data;

  // Measure tight bounding box of actual drawn glyph pixels
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (imgData[idx] > 70) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    return {
      positions: new Float32Array(0),
      colors: new Float32Array(0),
      sizes: new Float32Array(0),
    };
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const textWidth = maxX - minX;

  // Refined target 3D width: 2.6 units (flowing cursive silhouette)
  const scale = 2.6 / textWidth;

  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];

  const colorWhite = new THREE.Color('#ffffff');
  const colorMint = new THREE.Color('#86ebc8');
  const colorCyan = new THREE.Color('#8dd4ff');
  const colorPeach = new THREE.Color('#ffbd89');

  const step = 2; // Delicate crisp sampling along the fine lines

  for (let y = minY; y <= maxY; y += step) {
    for (let x = minX; x <= maxX; x += step) {
      const idx = (y * w + x) * 4;
      const alpha = imgData[idx];

      if (alpha > 70) {
        const posX = (x - centerX) * scale;
        const posY = -(y - centerY) * scale;

        // Delicate fine-line constellation point
        const frontZ = (Math.random() - 0.5) * 0.08;
        positions.push(posX, posY, frontZ);

        const roll = Math.random();
        let c = colorMint;
        if (roll < 0.45) c = colorWhite;
        else if (roll < 0.75) c = colorMint;
        else if (roll < 0.9) c = colorCyan;
        else c = colorPeach;

        colors.push(c.r, c.g, c.b);
        sizes.push(0.09 + Math.random() * 0.04);
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
}

// Generate Astra-inspired galactic spiral swirl closely framing the "TUK" monogram
function generateAstraGalaxyParticles(count = 2800) {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];

  const colorWhite = new THREE.Color('#ffffff');
  const colorCyan = new THREE.Color('#8dd4ff');
  const colorMint = new THREE.Color('#86ebc8');
  const colorPeach = new THREE.Color('#ff9271');
  const colorAmber = new THREE.Color('#f6c867');

  const arms = 2; // Two grand design logarithmic spiral arms

  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const distance = 1.35 + Math.pow(t, 1.25) * 2.1;
    const armIndex = i % arms;
    const armOffset = (armIndex * 2 * Math.PI) / arms;

    const spin = distance * 1.45;
    const angle = armOffset + spin;

    const dispersion = 0.1 + (distance / 3.45) * 0.28;
    const scatterX = (Math.random() + Math.random() - 1) * dispersion;
    const scatterY = (Math.random() + Math.random() - 1) * dispersion;
    const scatterZ = (Math.random() + Math.random() - 1) * (dispersion * 0.8);

    const x = Math.cos(angle) * distance + scatterX;
    const y = Math.sin(angle) * distance * 0.68 + scatterY;
    const z = scatterZ + Math.sin(distance * 2.2) * 0.18;

    positions.push(x, y, z);

    const distRatio = (distance - 1.35) / 2.1;
    let c: THREE.Color;
    if (distRatio < 0.25) {
      c = Math.random() > 0.4 ? colorMint : colorWhite;
    } else if (distRatio < 0.6) {
      c = Math.random() > 0.5 ? colorCyan : colorMint;
    } else if (distRatio < 0.85) {
      c = Math.random() > 0.4 ? colorPeach : colorCyan;
    } else {
      c = Math.random() > 0.5 ? colorAmber : colorMint;
    }

    colors.push(c.r, c.g, c.b);
    sizes.push(0.09 + Math.random() * 0.1);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
}

// Deep background ambient stars (2,800+ stars with 3 depth layers)
function generateAmbientStars(count = 2800) {
  const positions: number[] = [];
  const colors: number[] = [];

  const colorWhite = new THREE.Color('#ffffff');
  const colorSky = new THREE.Color('#94c7f3');
  const colorMint = new THREE.Color('#86ebc8');
  const colorAmber = new THREE.Color('#ffd8a8');

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    let radius = 14 + Math.random() * 22;
    if (roll < 0.1) {
      radius = 2.5 + Math.random() * 3.5;
    } else if (roll < 0.35) {
      radius = 6 + Math.random() * 8;
    }

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions.push(x, y, z);

    const r = Math.random();
    let c = colorWhite;
    if (r < 0.45) c = colorWhite;
    else if (r < 0.7) c = colorSky;
    else if (r < 0.88) c = colorMint;
    else c = colorAmber;

    colors.push(c.r, c.g, c.b);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

interface SynapseParam {
  baseAngle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  offsetZ: number;
  letterIndex: number;
}

const LETTER_CENTERS = [-0.86, 0.0, 0.86] as const;

function generateSynapseSparkData(count = 50) {
  const params: SynapseParam[] = [];
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorMint = new THREE.Color('#86ebc8');
  const colorCyan = new THREE.Color('#8dd4ff');
  const colorWhite = new THREE.Color('#ffffff');

  for (let i = 0; i < count; i++) {
    params.push({
      baseAngle: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.2,
      radiusX: 0.45 + Math.random() * 0.45,
      radiusY: 0.35 + Math.random() * 0.45,
      offsetZ: (Math.random() - 0.5) * 0.35,
      letterIndex: i % 3,
    });

    const c = Math.random() > 0.5 ? colorMint : Math.random() > 0.25 ? colorCyan : colorWhite;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { params, positions, colors };
}

// Living energetic synapse sparks flowing along the TUK glyphs
function DynamicSynapseSparks({ starTexture }: { starTexture: THREE.Texture }) {
  const count = 50;
  const meshRef = useRef<THREE.Points>(null);

  const { params, positions, colors } = useMemo(() => generateSynapseSparkData(count), [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const geom = meshRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const p = params[i];
      const angle = p.baseAngle + time * p.speed;
      const lx = LETTER_CENTERS[p.letterIndex];

      posArray[i * 3] = lx + Math.cos(angle) * p.radiusX;
      posArray[i * 3 + 1] = Math.sin(angle * 1.4) * p.radiusY;
      posArray[i * 3 + 2] = p.offsetZ + Math.sin(angle * 2.2) * 0.12;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CosmicSystem() {
  const mainGroup = useRef<THREE.Group>(null);
  const galaxyRing = useRef<THREE.Group>(null);
  const starfieldRef = useRef<THREE.Points>(null);

  const { viewport } = useThree();

  // Memoize particle data
  const starTexture = useMemo(() => createStarTexture(), []);
  const tukData = useMemo(() => generateTukParticles(), []);
  const galaxyData = useMemo(() => generateAstraGalaxyParticles(2800), []);
  const starfieldData = useMemo(() => generateAmbientStars(2800), []);

  // 3D Mouse Drag & Rotation State with smooth spring restitution
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragRot = useRef({ x: 0, y: 0 });
  const targetDragRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      targetDragRot.current.y += dx * 0.007;
      targetDragRot.current.x += dy * 0.007;

      targetDragRot.current.x = Math.max(-0.85, Math.min(0.85, targetDragRot.current.x));
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  useFrame((state, delta) => {
    const group = mainGroup.current;
    if (!group) return;

    const pointer = state.pointer;
    const time = state.clock.elapsedTime;

    // 1. Mouse Drag Rotation & Spring Return to Resting Forward Position
    if (!isDragging.current) {
      targetDragRot.current.x = THREE.MathUtils.lerp(targetDragRot.current.x, 0, 0.038);
      targetDragRot.current.y = THREE.MathUtils.lerp(targetDragRot.current.y, 0, 0.038);
    }
    dragRot.current.x = THREE.MathUtils.lerp(dragRot.current.x, targetDragRot.current.x, 0.12);
    dragRot.current.y = THREE.MathUtils.lerp(dragRot.current.y, targetDragRot.current.y, 0.12);

    // 2. Cursor Hover Parallax Tracking
    const hoverTiltX = -pointer.y * 0.16;
    const hoverTiltY = pointer.x * 0.24;
    const hoverShiftX = pointer.x * 0.28;
    const hoverShiftY = pointer.y * 0.16;

    // 3. Slow-Motion Drift: Moving from Left to Right and into Corners
    // Graceful, continuous celestial flight path (period ~26s)
    const slowTime = time * 0.22;
    const slowDriftX = Math.sin(slowTime) * 1.45 + Math.cos(slowTime * 0.48) * 0.7;
    const slowDriftY = Math.cos(slowTime * 1.25) * 0.55 + Math.sin(slowTime * 0.65) * 0.35;
    const slowRollZ = Math.cos(slowTime) * 0.035;
    const slowYaw = Math.sin(slowTime * 0.75) * 0.1;

    // 4. Dynamic Base Positioning (Responsive)
    const isDesktop = viewport.width > 7.2;
    const targetBaseX = isDesktop ? -Math.min(1.8, viewport.width * 0.18) : 0;
    const targetBaseY = isDesktop ? 0.15 : 0.55;

    // 5. Smooth motion interpolation
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, dragRot.current.x + hoverTiltX, 0.08);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, dragRot.current.y + hoverTiltY + slowYaw, 0.08);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, slowRollZ, 0.05);

    group.position.x = THREE.MathUtils.lerp(group.position.x, targetBaseX + slowDriftX + hoverShiftX, 0.045);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetBaseY + slowDriftY + hoverShiftY, 0.045);

    // 6. Dynamic Astra Orbital Swirl Ribbon
    if (galaxyRing.current) {
      galaxyRing.current.rotation.z += delta * 0.038;
      galaxyRing.current.rotation.x = -0.36 + Math.sin(time * 0.65) * 0.07;
      galaxyRing.current.rotation.y = 0.16 + Math.cos(time * 0.5) * 0.05;
    }

    // 7. Ambient Deep-Space Cosmic Drift
    if (starfieldRef.current) {
      starfieldRef.current.rotation.y += delta * 0.004;
    }
  });

  return (
    <>
      {/* Main 3D TUK Entity Group (Positioned on Left, slow drifting left-right & corners, rotatable) */}
      <group ref={mainGroup} position={[-1.75, 0.12, 0]}>
        {/* 1. Luminous, Lightly Visible "TUK" 3D Monogram Constellation */}
        {tukData.positions.length > 0 && (
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[tukData.positions, 3]}
              />
              <bufferAttribute
                attach="attributes-color"
                args={[tukData.colors, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.09}
              map={starTexture}
              vertexColors
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        )}

        {/* 2. Living Energetic Synapse Sparks flowing along the glyphs */}
        <DynamicSynapseSparks starTexture={starTexture} />

        {/* 3. Astra Swirling Outer Galactic Spiral Ring (Frames TUK from outside) */}
        <group ref={galaxyRing} rotation={[-0.36, 0.16, 0]}>
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[galaxyData.positions, 3]}
              />
              <bufferAttribute
                attach="attributes-color"
                args={[galaxyData.colors, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.09}
              map={starTexture}
              vertexColors
              transparent
              opacity={0.38}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        </group>
      </group>

      {/* 4. Deep Ambient Cosmic Starfield (2,800+ Stars providing immense depth) */}
      <points ref={starfieldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starfieldData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starfieldData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={starTexture}
          vertexColors
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function TukCosmicScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <CosmicSystem />
    </Canvas>
  );
}
